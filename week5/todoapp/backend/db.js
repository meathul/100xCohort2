require('dotenv').config();
const mongoose = require("mongoose");

const connectionstring = process.env.connectionstring;

console.log('Attempting to connect to MongoDB...');
console.log('Connection string:', connectionstring.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

mongoose.connect(connectionstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    maxPoolSize: 10, // Maintain up to 10 socket connections
})
.then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas');
})
.catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('Full error:', err);
    
    // Don't exit, let the app try to reconnect
    // process.exit(1);
});

// Connection event handlers
mongoose.connection.on('connected', () => {
    console.log('🔗 Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose disconnected from MongoDB');
});

mongoose.connection.on('reconnected', () => {
    console.log('🔄 Mongoose reconnected to MongoDB');
});

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
    todo: todo
};