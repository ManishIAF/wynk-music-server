const mongoose = require('mongoose');

const DB_Connection = async () => {
    
    try {
        await mongoose.connect(process.env.DB_URL)
        return 'Connected to DB'
    } catch (error) {
        return 'Error connecting to DB';
    }
}

module.exports = DB_Connection;