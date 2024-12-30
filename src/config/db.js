const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS: 5000});
        console.log('My MongoDB Atlas Service connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
