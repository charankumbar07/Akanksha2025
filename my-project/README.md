# 🏆 Hustle Competition Platform

A full-stack MERN application for managing technical competition registrations with team-based authentication and competition tracking.

## 🚀 Features

- **Team Registration**: Complete team registration with 2 members
- **Authentication**: JWT-based secure authentication
- **Competition Management**: Track team status and scores across rounds
- **Round 3: CODE RUSH**: Special coding challenge with access code "x24"
- **Modern UI**: Glassmorphism design with Tailwind CSS
- **Responsive Design**: Mobile-first approach
- **Real-time Validation**: Client and server-side validation

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
my-project/
├── src/                          # Frontend (React)
│   ├── components/               # Reusable UI components
│   ├── pages/                   # Page components
│   ├── rounds/                  # Round-specific components
│   │   └── Round3/             # Round 3 CODE RUSH
│   ├── services/                # API service layer
│   └── assets/                  # Static assets
├── backend/                     # Backend (Node.js/Express)
│   ├── controllers/             # Route controllers
│   ├── middleware/              # Custom middleware
│   ├── models/                  # Database models
│   ├── routes/                  # API routes
│   ├── config/                  # Configuration files
│   └── server.js               # Main server file
└── public/                      # Static files
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone and Setup
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Environment Configuration

#### Backend Environment
Create `backend/config.env`:
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hustle_competition
JWT_SECRET=your_secure_jwt_secret_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5175
```

#### Frontend Environment
Create `.env.local` in project root:
```env
VITE_API_URL=http://localhost:5001/api
```

### 3. Start the Application

#### Backend
```bash
cd backend
npm run dev
```

#### Frontend
```bash
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5175
- **Backend API**: http://localhost:5001/api
- **Health Check**: http://localhost:5001/api/health

## 🎮 Round 3: CODE RUSH

Round 3 is a special coding challenge accessible through the main application:

1. **Access**: Go to `/result` page and click "Start Round 3"
2. **Access Code**: Enter "x24" when prompted (case-insensitive)
3. **Challenge**: Complete 5 C programming puzzles
4. **Timer**: 5 minutes per question
5. **Auto-save**: Progress is automatically saved
6. **Admin View**: View all team results and programs

### Round 3 Features:
- **Code Verification**: Secure access with "x24" code
- **Question Randomization**: 5 different question orders
- **Real-time Scoring**: Immediate feedback on answers
- **Progress Tracking**: Visual progress indicators
- **Admin Dashboard**: Complete program analysis

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new team | No |
| POST | `/api/auth/login` | Login team | No |
| GET | `/api/auth/profile` | Get team profile | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |
| PUT | `/api/auth/change-password` | Change password | Yes |
| POST | `/api/auth/logout` | Logout team | Yes |

### Competition
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/competition/leaderboard` | Get leaderboard | No |
| GET | `/api/competition/stats` | Get competition stats | No |
| GET | `/api/competition/status` | Get team status | Yes |
| PUT | `/api/competition/status` | Update status | Yes |
| POST | `/api/competition/verify-round3-code` | Verify Round 3 access code | Yes |

### Round 3 (CODE RUSH)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/round3/submit` | Submit Round 3 results | Yes |
| GET | `/api/round3/scores` | Get Round 3 leaderboard | No |

## 🗄️ Database Schema

### Team Model
```javascript
{
  teamName: String (unique, required)
  members: {
    member1: { name: String, email: String },
    member2: { name: String, email: String }
  }
  leader: String (enum: ['member1', 'member2'])
  leaderPhone: String
  password: String (hashed)
  isActive: Boolean
  registrationDate: Date
  lastLogin: Date
  competitionStatus: String
  scores: {
    round1: Number,
    round2: Number,
    round3: Number,
    total: Number
  }
}
```

## 🔧 Development

### Frontend Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Development
```bash
# Start with nodemon (auto-restart)
npm run dev

# Start production server
npm start
```

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure authentication
- **Input Validation**: Server-side validation
- **Rate Limiting**: API abuse protection
- **CORS**: Cross-origin security
- **Helmet**: Security headers

## 🚀 Deployment

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy `dist` folder to hosting service
3. Update `VITE_API_URL` for production

### Backend Deployment
1. Set production environment variables
2. Use PM2 or similar process manager
3. Configure reverse proxy (nginx)
4. Set up MongoDB Atlas or production DB

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/hustle_competition
JWT_SECRET=very_secure_production_secret
FRONTEND_URL=https://your-frontend-domain.com
```

## 🧪 Testing

### Manual Testing
1. **Register a Team**: Go to `/register` and create a new team
2. **Login**: Use registered credentials at `/login`
3. **Profile Management**: Update team information
4. **Competition Features**: Check leaderboard and stats

### API Testing
```bash
# Health check
curl http://localhost:5001/api/health

# Register team
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"teamName":"TestTeam","member1Name":"John","member1Email":"john@test.com","member2Name":"Jane","member2Email":"jane@test.com","leader":"member1","leaderPhone":"+1234567890","password":"TestPass123","confirmPassword":"TestPass123"}'
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding! 🚀**