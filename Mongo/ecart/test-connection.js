require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('✅ MongoDB connected successfully!');
    process.exit(0);
})
.catch((error) => {
    console.log('❌ MongoDB connection failed:', error.message);
    process.exit(1);
});