# HUSTLE 2025 - Unified Competition Platform

## 🎯 Project Overview

This repository contains the complete unified HUSTLE competition platform that integrates all rounds (Round 1, Round 2, Round 3) into a single, comprehensive web application.

## ✅ Implemented Features

### 🔐 Authentication System
- **Team Registration**: Complete team signup with validation
- **Team Login**: Secure authentication with token management
- **Admin Login**: Secure admin access (credentials: `admin` / `admin123`)
- **Logout Functionality**: Clean session termination

### 📊 Team Dashboard (`/team`)
- **Progressive Round Unlocking**: Teams must complete previous rounds to unlock next ones
- **Round Status Tracking**: Visual indicators for each round's status
- **Result Checking**: Teams can check qualification results
- **Responsive Design**: Works on all device sizes

### 🏆 Competition Rounds
- **Round 1**: Offline round with registration confirmation and result checking
- **Round 2**: Online assessment with multiple question types (Aptitude, Debug, Program, Trace)
- **Round 3**: Final coding challenge with live coding environment

### 👨‍💼 Admin Dashboard
- **Secure Access**: Admin-only authentication required
- **Team Management**: View and manage participating teams
- **Round Administration**: Access to round-specific admin panels
- **Competition Statistics**: Overview of participation and progress

### 🎨 User Interface
- **Clean Design**: Modern, responsive UI with gradient backgrounds
- **SVG Icons**: Professional iconography (no emojis)
- **Navigation**: Intuitive header with team name and logout
- **Consistent Styling**: Unified theme across all pages

## 🗂️ Project Structure

```
my-project/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── TeamHeader.jsx   # Header with team name and logout
│   │   ├── Footer.jsx       # Simple footer component
│   │   ├── Round1.jsx       # Round 1 component
│   │   ├── Round2.jsx       # Round 2 assessment
│   │   └── Round3.jsx       # Round 3 coding challenge
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx     # Landing page
│   │   ├── LoginPage.jsx    # Team login
│   │   ├── RegisterPage.jsx # Team registration
│   │   ├── ResultPage.jsx   # Team dashboard (now at /team)
│   │   ├── AdminLoginPage.jsx # Admin authentication
│   │   └── AdminPage.jsx    # Admin dashboard
│   ├── services/            # API services
│   │   └── authService.js   # Authentication API calls
│   └── App.jsx              # Main app with routing
├── backend/                 # Express.js backend
│   ├── routes/              # API routes
│   ├── models/              # Database models
│   ├── controllers/         # Business logic
│   └── server.js            # Main server file
└── README.md                # This file
```

## 🚀 Key Features in Detail

### Progressive Round System
1. **Round 1 (Offline)**: 
   - Teams automatically registered upon account creation
   - "Check Result" button reveals qualification status
   - 80% qualification rate for demo purposes
   - Unlocks Round 2 upon qualification

2. **Round 2 (Online Assessment)**:
   - Multiple question types: Aptitude, Debug, Program, Trace
   - Timed assessment with global timer
   - Progress tracking and submission system
   - Unlocks Round 3 upon completion

3. **Round 3 (Final Challenge)**:
   - Live coding environment
   - Advanced programming challenges
   - Real-time code execution
   - Final ranking determination

### Admin Features
- **Team Overview**: View all registered teams and their progress
- **Round Management**: Access specific admin panels for each round
- **Result Management**: Control qualification results and progression
- **Platform Monitoring**: Track overall competition statistics

## 🔧 Technical Implementation

### Frontend Stack
- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first styling
- **SVG Icons**: Scalable vector graphics
- **Responsive Design**: Mobile-first approach

### Backend Stack
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: Document database
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **Helmet**: Security middleware

### State Management
- **localStorage**: Persistent client-side storage
- **React State**: Component-level state management
- **Progress Tracking**: Persistent round progress

## 📱 User Flow

1. **Landing Page** → Team sees competition overview
2. **Registration** → Teams create accounts with member details
3. **Login** → Secure authentication and token storage
4. **Team Dashboard** → Central hub showing all rounds
5. **Round Progression** → Complete rounds sequentially
6. **Result Checking** → See qualification status
7. **Admin Access** → Separate admin portal for management

## 🛠️ Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/charankumbar07/Akanksha2025.git
   cd Akanksha2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install
   ```

3. **Start the development servers**
   ```bash
   # Frontend (React)
   npm run dev

   # Backend (Express)
   cd backend && npm start
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Team Dashboard: `http://localhost:5173/team` (after login)
   - Admin Panel: `http://localhost:5173/admin/login`

## 🎯 Demo Credentials

### Admin Access
- **Username**: `admin`
- **Password**: `admin123`

### Team Access
- Create new team account via registration
- Or use any existing team credentials

## 📈 Current Status

✅ **Complete Features**:
- Unified platform with all rounds integrated
- Progressive round unlocking system
- Admin dashboard with secure authentication
- Team dashboard with result checking
- Clean UI with SVG icons and responsive design
- Complete backend API integration
- Proper routing system (`/team` instead of `/result`)

## 🔄 Recent Updates

- **UI Improvements**: Removed emojis, added SVG icons
- **Layout Fix**: Moved "How It Works" section below rounds
- **Header Simplification**: Clean team name display
- **Footer Update**: Using consistent simple footer
- **Route Update**: Changed from `/result` to `/team`
- **Admin Security**: Enhanced admin authentication

## 📞 Support

For technical support or questions about the platform, contact the development team.

---

**© 2025 HUSTLE Competition Platform. All rights reserved.**
