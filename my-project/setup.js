#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🚀 Setting up Hustle Competition Platform...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json') || !fs.existsSync('backend')) {
    console.error('❌ Please run this script from the project root directory');
    process.exit(1);
}

// Step 1: Install frontend dependencies
console.log('📦 Installing frontend dependencies...');
exec('npm install', (error, stdout, stderr) => {
    if (error) {
        console.error('❌ Error installing frontend dependencies:', error);
        return;
    }
    console.log('✅ Frontend dependencies installed');

    // Step 2: Install backend dependencies
    console.log('\n📦 Installing backend dependencies...');
    exec('cd backend && npm install', (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Error installing backend dependencies:', error);
            return;
        }
        console.log('✅ Backend dependencies installed');

        // Step 3: Create environment files
        console.log('\n⚙️  Setting up environment files...');

        // Frontend .env.local
        const frontendEnv = 'VITE_API_URL=http://localhost:5001/api\n';
        try {
            fs.writeFileSync('.env.local', frontendEnv);
            console.log('✅ Created .env.local for frontend');
        } catch (error) {
            console.log('⚠️  Could not create .env.local (may be blocked by gitignore)');
            console.log('   Please create .env.local manually with: VITE_API_URL=http://localhost:5001/api');
        }

        // Backend config.env
        const backendEnv = `# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/hustle_competition

# JWT Configuration
JWT_SECRET=6bc9576301ada3899a3de18914aeff5ee7c28ea66799d96c9ec51e68d8e929b97315a93df0618d01f99cf28f22d1c5890f74af88eceb4a074851178fe5a81daa
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5175
`;

        try {
            fs.writeFileSync('backend/config.env', backendEnv);
            console.log('✅ Created backend/config.env');
        } catch (error) {
            console.log('❌ Error creating backend/config.env:', error.message);
        }

        console.log('\n🎉 Setup completed successfully!');
        console.log('\n📋 Next steps:');
        console.log('1. Start MongoDB (if using local database)');
        console.log('2. Start backend: cd backend && npm run dev');
        console.log('3. Start frontend: npm run dev');
        console.log('4. Open http://localhost:5175 in your browser');
        console.log('\n✨ Happy coding!');
    });
});
