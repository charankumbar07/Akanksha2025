# Hustle - Technical Competition Registration Platform

A modern React-based web application for technical competition registration and management.

## Features

- **Home Page**: Competition overview with event details and rounds information
- **Registration**: Team registration with member details and validation
- **Login**: Team authentication system
- **Responsive Design**: Modern UI with gradient backgrounds and glassmorphism effects
- **React Router**: Seamless navigation between pages

## Tech Stack

- **React 19** - Frontend framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server

## Quick Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hustle-competition-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   └── Footer.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration Files

- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `vite.config.js` - Vite configuration

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
