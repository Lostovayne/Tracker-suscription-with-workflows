# Subscription Tracker 🚀

## 📋 Project Overview

Subscription Tracker is a robust web application designed to help users manage and track their subscriptions efficiently. Built with modern web technologies, this application provides a seamless experience for monitoring and organizing subscription-related information.

## 🌟 Features

- User Authentication (Sign Up, Sign In, Sign Out)
- Create, Read, Update, and Delete (CRUD) Subscription Management
- Secure MongoDB Database Integration
- JWT-based Authentication
- TypeScript Support
- Express.js Backend

## 🛠 Tech Stack

- **Backend**: 
  - Node.js
  - Express.js
  - TypeScript
- **Database**: 
  - MongoDB
  - Mongoose ODM
- **Authentication**:
  - JSON Web Tokens (JWT)
  - Bcrypt for password hashing
- **Environment Management**:
  - dotenv

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18+ recommended)
- Bun (recommended package manager)
- MongoDB (local or cloud instance)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tracker-suscription.git
cd tracker-suscription
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Environment Configuration

Create `.env.development.local` in the project root:

```env
# Server Configuration
PORT=5500
NODE_ENV=development

# Database Configuration
DB_URI=mongodb://your-mongodb-connection-string

# JWT Authentication
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN=1d
```

### 4. Database Setup

Ensure MongoDB is running and the connection string is correctly configured in your `.env` file.

## 🔧 Running the Application

### Development Mode

```bash
bun dev
```

### Production Build

```bash
bun run build
bun start
```

## 📡 API Endpoints

### Authentication Routes

- `POST /api/v1/auth/sign-up`: Register a new user
- `POST /api/v1/auth/sign-in`: User login
- `GET /api/v1/auth/sign-out`: User logout

### Subscription Routes

- `GET /api/v1/subscriptions`: Fetch all subscriptions
- `GET /api/v1/subscriptions/:id`: Fetch a specific subscription
- `POST /api/v1/subscriptions`: Create a new subscription
- `PUT /api/v1/subscriptions/:id`: Update a subscription
- `DELETE /api/v1/subscriptions/:id`: Delete a subscription

## 🔒 Authentication Flow

1. User registers with email and password
2. Server hashes password and stores user in MongoDB
3. JWT token generated upon successful login
4. Token used for authenticating subsequent requests

## 🧪 Testing

(TODO: Add testing instructions and commands)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🎉 Acknowledgments

- Express.js
- Mongoose
- TypeScript
- JSON Web Tokens

## 🚨 Troubleshooting

- Ensure all environment variables are correctly set
- Check MongoDB connection string
- Verify Node.js and Bun versions

## 📞 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/your-username/tracker-suscription](https://github.com/your-username/tracker-suscription)