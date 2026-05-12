const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/auth');
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const uploadRoutes = require('./routes/upload');
const dashboardRoutes = require('./routes/dashboard');
const rfqRoutes = require('./routes/rfq');
const chatRoutes = require('./routes/chat');
const cronRoutes = require('./routes/cron');
const reviewsRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admin');
const coursesRoutes = require('./routes/courses');
const aiRoutes = require('./routes/ai');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3005;

// ─── Middlewares ──────────────────────────────────────────────────────────────
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: [
    'https://khama.onrender.com',
    'http://localhost:3000',
    'http://localhost:8081', // Expo
  ],
  credentials: true,
}));
app.use(express.json({ limit: '5mb' }));

// ─── Health Check (ضروري لـ Render) ──────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

app.get('/', (req, res) => {
  res.json({ message: '🚀 Khama API v1.0', docs: '/api/v1' });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/rfq', rfqRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/cron', cronRoutes);
app.use('/api/v1/reviews', reviewsRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/ai', aiRoutes);

// ─── Socket.io Logic ──────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`User joined conversation: ${conversationId}`);
  });

  socket.on('send_message', async (data) => {
    const { conversationId, senderId, text, image } = data;
    
    // حفظ الرسالة في قاعدة البيانات
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        text,
        image
      },
      include: { sender: { select: { fullName: true, avatar: true } } }
    });

    // تحديث المحادثة بآخر رسالة
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessage: text || 'صورة', lastMessageAt: new Date() }
    });

    // إرسال الرسالة لجميع أطراف المحادثة
    io.to(conversationId).emit('new_message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'المسار غير موجود' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'خطأ داخلي في الخادم' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Khama API running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
