const express = require('express');
const router = express.Router();
const { prisma } = require('../lib/prisma');
const { authenticate } = require('../middleware/auth');

// 📋 جلب قائمة المحادثات للمستخدم الحالي
router.get('/conversations', authenticate, async (req, res) => {
  const conversations = await prisma.conversation.findMany({
    where: {
      participants: { some: { id: req.user.id } }
    },
    include: {
      participants: {
        where: { id: { not: req.user.id } },
        select: { id: true, fullName: true, avatar: true }
      }
    },
    orderBy: { lastMessageAt: 'desc' }
  });
  res.json(conversations);
});

// 💬 جلب رسائل محادثة معينة
router.get('/conversations/:id/messages', authenticate, async (req, res) => {
  const messages = await prisma.message.findMany({
    where: { conversationId: req.params.id },
    include: { sender: { select: { id: true, fullName: true, avatar: true } } },
    orderBy: { createdAt: 'asc' }
  });
  res.json(messages);
});

// 🆕 إنشاء محادثة جديدة أو جلب الموجودة
router.post('/conversations', authenticate, async (req, res) => {
  const { participantId } = req.body;
  
  // البحث عن محادثة قائمة بين الطرفين
  let conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        { participants: { some: { id: req.user.id } } },
        { participants: { some: { id: participantId } } }
      ]
    },
    include: {
      participants: { select: { id: true, fullName: true, avatar: true } }
    }
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: [{ id: req.user.id }, { id: participantId }]
        }
      },
      include: {
        participants: { select: { id: true, fullName: true, avatar: true } }
      }
    });
  }

  res.json(conversation);
});

module.exports = router;
