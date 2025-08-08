import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión a MongoDB Atlas establecida');
  } catch (err) {
    console.error('Error al conectar a MongoDB Atlas:', err.message);
    process.exit(1);
  }
};

export default connectDB;
