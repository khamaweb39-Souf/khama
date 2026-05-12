const express = require('express');
const router = express.Router();
const { prisma } = require('../lib/prisma');
const { authenticate } = require('../middleware/auth');

// 📋 قائمة الدورات
router.get('/', async (req, res) => {
  try {
    const { category, level, search, page = 1, limit = 12 } = req.query;
    
    const where = {
      status: 'PUBLISHED',
      ...(category && { category }),
      ...(level && { level }),
      ...(search && {
        OR: [
          { title: { path: ['ar'], string_contains: search } },
          { description: { contains: search } }
        ]
      })
    };
    
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          trainer: { select: { fullName: true, avatar: true } },
          _count: { select: { chapters: true } }
        },
        orderBy: { enrollmentCount: 'desc' },
        skip: (page - 1) * parseInt(limit),
        take: parseInt(limit)
      }),
      prisma.course.count({ where })
    ]);
    
    res.json({ courses, total });
  } catch (error) {
    res.status(500).json({ error: 'فشل جلب قائمة الدورات' });
  }
});

// 🔍 تفاصيل الدورة
router.get('/:id', async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: {
        trainer: { select: { fullName: true, avatar: true } },
        chapters: {
          include: { lessons: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' }
        }
      }
    });
    
    if (!course) return res.status(404).json({ error: 'الدورة غير موجودة' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'فشل جلب تفاصيل الدورة' });
  }
});

// 🎓 التسجيل في دورة (شراء)
router.post('/:id/enroll', authenticate, async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;
    
    const existing = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } }
    });
    
    if (existing) return res.status(400).json({ error: 'أنت مسجل بالفعل في هذه الدورة' });
    
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) return res.status(404).json({ error: 'الدورة غير موجودة' });

    // إنشاء التسجيل وتحديث العداد
    const enrollment = await prisma.enrollment.create({
      data: { userId, courseId }
    });
    
    await prisma.course.update({
      where: { id: courseId },
      data: { enrollmentCount: { increment: 1 } }
    });
    
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: 'فشل عملية التسجيل' });
  }
});

// 📈 تحديث التقدم في الدروس
router.patch('/:id/progress', authenticate, async (req, res) => {
  try {
    const { lessonId } = req.body;
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user.id, courseId: req.params.id } }
    });
    
    if (!enrollment) return res.status(404).json({ error: 'غير مسجل في الدورة' });
    
    let progress = Array.isArray(enrollment.progress) ? enrollment.progress : [];
    if (!progress.includes(lessonId)) {
      progress.push(lessonId);
    }
    
    const updated = await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { progress }
    });
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'فشل تحديث التقدم' });
  }
});

// 📜 إصدار شهادة إتمام الدورة
router.get('/:id/certificate', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.id;

    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
      include: {
        user: { select: { fullName: true } },
        course: { select: { title: true, chapters: { include: { lessons: true } } } }
      }
    });

    if (!enrollment) return res.status(404).json({ error: 'غير مسجل في هذه الدورة' });

    // حساب إجمالي الدروس
    const totalLessons = enrollment.course.chapters.reduce(
      (sum, ch) => sum + ch.lessons.length, 0
    );
    
    const progress = Array.isArray(enrollment.progress) ? enrollment.progress : [];
    
    if (progress.length < totalLessons) {
      return res.status(400).json({ 
        error: 'لم تقم بإكمال جميع الدروس بعد',
        progress: `${progress.length}/${totalLessons}` 
      });
    }

    // إذا اكتملت الدورة، نقوم بتحديث تاريخ الإكمال إذا لم يكن موجوداً
    if (!enrollment.completedAt) {
      await prisma.enrollment.update({
        where: { id: enrollment.id },
        data: { completedAt: new Date() }
      });
    }

    res.json({
      studentName: enrollment.user.fullName,
      courseTitle: enrollment.course.title.ar,
      completionDate: enrollment.completedAt || new Date(),
      certificateId: `KH-${enrollment.id.slice(-8).toUpperCase()}`
    });
  } catch (error) {
    res.status(500).json({ error: 'فشل إصدار الشهادة' });
  }
});

module.exports = router;
