# School Competency Assessment System

A comprehensive web-based assessment platform designed for evaluating student competencies across multiple levels (A1/A2, B1/B2, C1/C2). The system provides a modern, user-friendly interface for taking assessments, tracking progress, and generating professional certificates.

## 🚀 Features

### Core Functionality
- **Multi-level Assessment System**: Three-step assessment covering A1/A2, B1/B2, and C1/C2 competency levels
- **User Authentication**: Secure login/register system with OTP verification
- **Role-based Access**: Support for admin, student, and supervisor roles
- **Real-time Assessment**: Interactive question-answer interface with timer
- **Progress Tracking**: Detailed analytics and performance metrics
- **Certificate Generation**: Professional certificates with unique IDs and scores
- **Password Recovery**: Secure forgot password functionality with email verification

### User Experience
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Dashboard Analytics**: Visual representation of assessment results
- **Protected Routes**: Secure navigation with authentication middleware
- **Real-time Feedback**: Immediate scoring and performance insights

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + bcrypt
- **Email Service**: Nodemailer for OTP delivery
- **Development**: Nodemon for hot reloading

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📁 Project Structure

```
School-Competency-assessment/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Authentication middleware
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── config/          # Database configuration
│   └── package.json
├── frontend/
│   └── school-assessment/   # React frontend application
│       ├── src/
│       │   ├── components/  # Reusable UI components
│       │   ├── pages/       # Page components
│       │   ├── features/    # Redux slices and API
│       │   └── utils/       # Utility functions
│       └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd School-Competency-assessment
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend/school-assessment
   npm install
   ```

4. **Environment Configuration**

   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

5. **Database Setup**
   - Ensure MongoDB is running
   - The application will automatically create collections on first run

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The API server will start on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend/school-assessment
   npm run dev
   ```
   The React app will start on `http://localhost:5173`

## 📖 Usage Guide

### For Students
1. **Registration**: Create an account with email verification
2. **Login**: Access your personalized dashboard
3. **Assessment**: Take the three-step competency assessment
4. **Results**: View detailed performance analytics
5. **Certificate**: Download your professional certificate

### For Administrators
1. **User Management**: Monitor student accounts and progress
2. **Assessment Management**: Configure questions and scoring
3. **Analytics**: Access comprehensive performance reports

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/forgot-password` - Password recovery

### Assessment
- `GET /api/assessments/questions` - Get assessment questions
- `POST /api/assessments/submit` - Submit assessment answers
- `GET /api/assessments/results` - Get user results

## 🏗️ Development

### Available Scripts

**Backend:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Structure
- **TypeScript**: Full type safety across the application
- **ESLint**: Code quality and consistency
- **Modular Architecture**: Separated concerns with clear file organization

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **CORS Protection**: Configured for secure cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **Protected Routes**: Client and server-side route protection

## 📊 Assessment Structure

The system implements a three-step assessment process:

1. **Step 1 (A1/A2 Level)**: 30 minutes duration
2. **Step 2 (B1/B2 Level)**: 45 minutes duration  
3. **Step 3 (C1/C2 Level)**: 60 minutes duration

Each step contains multiple-choice questions with detailed scoring and analytics.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for educational competency assessment**