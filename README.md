# Chess Backend API

A real-time multiplayer chess game backend built with Node.js, TypeScript, and modern technologies including Socket.IO, Redis, Kafka, and MongoDB.

## 🚀 Features

- **Real-time Multiplayer Chess**: Play chess with other players in real-time using WebSocket connections
- **Scalable Architecture**: Built with microservices architecture using Redis and Kafka for message queuing
- **User Management**: Complete user authentication and profile management
- **Game State Management**: Persistent game states with MongoDB and Redis caching
- **Docker Support**: Fully containerized application with Docker and Docker Compose
- **Kubernetes Ready**: K8s deployment configurations included
- **Type Safety**: Built with TypeScript for better development experience

## 🛠️ Tech Stack

- **Runtime**: Bun.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Cache**: Redis
- **Message Queue**: Apache Kafka
- **Real-time Communication**: Socket.IO
- **ORM**: Prisma
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes
- **Code Quality**: Prettier, Husky

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Bun](https://bun.sh/) (v1.0.32 or higher)
- [Docker](https://www.docker.com/) and Docker Compose
- [Node.js](https://nodejs.org/) (if not using Bun)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chessBack
```

### 2. Environment Setup

Create environment files from samples:

```bash
cp .env.sample .env
cp .env.sample .env.local
```

Update the environment variables in `.env` file according to your setup.

### 3. Start Services with Docker Compose

```bash
docker-compose up -d
```

This will start:
- MongoDB (port 27017)
- Mongo Express (port 8083)
- Redis (port 6379)
- Zookeeper (port 2181)
- Kafka (port 9092)
- Kafka UI (port 8082)

### 4. Install Dependencies

```bash
bun install
```

### 5. Database Setup

```bash
# Generate Prisma client
bunx prisma generate

# Run database migrations (if any)
bunx prisma db push
```

### 6. Start the Application

```bash
# Development mode with hot reload
bun run watch

# Or regular development mode
bun run dev
```

The server will start on `http://localhost:3000`

## 📁 Project Structure

```
src/
├── config/          # Configuration files
├── constant/        # Application constants
├── controller/      # Route controllers
│   ├── kafka/       # Kafka message handlers
│   ├── redis/       # Redis operations
│   ├── routes/      # HTTP route handlers
│   └── socket/      # Socket.IO event handlers
├── db/              # Database connections
├── lib/             # Core libraries and utilities
├── middleware/      # Express middlewares
├── models/          # Database models
├── routes/          # API route definitions
├── services/        # Business logic services
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 🔌 API Endpoints

### User Routes (`/api/v1/users`)
- `POST /register` - Register a new user
- `POST /login` - User login
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

### Chess Routes (`/api/v1/chess`)
- `POST /game` - Create a new game
- `GET /game/:id` - Get game details
- `POST /move` - Make a chess move
- `GET /games` - Get user's games

## 🔄 Real-time Events

The application uses Socket.IO for real-time communication:

### Client Events
- `join-game` - Join a chess game
- `make-move` - Make a chess move
- `leave-game` - Leave the current game

### Server Events
- `game-joined` - Confirmation of joining a game
- `move-made` - Broadcast chess move to players
- `game-over` - Game completion notification
- `player-disconnected` - Player disconnection notification

## 🐳 Docker Deployment

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t chess-backend .

# Run the container
docker run -p 3000:3000 chess-backend
```

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## ☸️ Kubernetes Deployment

Kubernetes configuration files are available in the `k8s/` directory:

```bash
# Apply all Kubernetes configurations
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get services
```

## 🔧 Development

### Available Scripts

```bash
# Start development server with hot reload
bun run watch

# Start development server
bun run dev

# Run tests
bun run test

# Format code with Prettier
bunx prettier --write .
```

### Code Quality

This project uses:
- **Prettier** for code formatting
- **Husky** for Git hooks
- **TypeScript** for type checking
- **Zod** for runtime validation

## 📊 Monitoring

### Service UIs

- **Mongo Express**: http://localhost:8083 (MongoDB GUI)
- **Kafka UI**: http://localhost:8082 (Kafka management)
- **Socket.IO Admin**: Available when admin UI is enabled

### Health Checks

The application includes health checks for:
- MongoDB connection
- Redis connection
- Kafka connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Environment Variables

Key environment variables (add to your `.env` file):

```env
PORT=3000
MONGODB_URI=mongodb://user:password@localhost:27017/chess
REDIS_URL=redis://localhost:6379
KAFKA_BROKERS=localhost:9092
JWT_SECRET=your-jwt-secret
NODE_ENV=development
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Make sure ports 3000, 6379, 27017, 9092 are available
2. **Docker services not starting**: Run `docker-compose down` and `docker-compose up -d`
3. **Database connection issues**: Check MongoDB and Redis are running
4. **Kafka connection issues**: Ensure Zookeeper is running before Kafka

### Logs

```bash
# Application logs
bun run dev

# Docker compose logs
docker-compose logs -f

# Specific service logs
docker-compose logs -f mongodb
docker-compose logs -f redis
docker-compose logs -f kafka
```

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Anand Kumar Dubey**

---

## 🙏 Acknowledgments

- Inspired by YouTube tutorials
- Built with modern web technologies
- Community contributions welcome

For more information or support, please open an issue in the repository.
