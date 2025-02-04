import express, { Request, Response } from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

// Routes
import itemRoutes from './routes/itemRoutes';


const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'healthy' });
});

app.use('/items', itemRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});


// this is where we can use a socket connection, for example to join a chat
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinedChat', (chatId: string) => {
      socket.join(chatId);
      console.log(`User ${socket.id} joined the chat ${chatId}`);
    });
  
    socket.on('error', (error: any) => {
      console.error(`Socket error on socket ID ${socket.id}:`, error);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});