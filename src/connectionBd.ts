import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  console.log("Comenzando conexión")
  try {
    await mongoose.connect( process.env.MONGO_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
    process.exit(1); // Salir de la aplicación en caso de error de conexión
  }
};

export default connectDB;
