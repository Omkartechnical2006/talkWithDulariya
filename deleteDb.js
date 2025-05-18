const mongoose = require('mongoose');
require('dotenv').config();

async function deleteDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aunt-memories');
    await mongoose.connection.dropDatabase();
    console.log('Database deleted successfully');
  } catch (error) {
    console.error('Error deleting database:', error);
  } finally {
    await mongoose.connection.close();
  }
}

deleteDatabase(); 