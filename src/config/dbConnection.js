import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://rulomolins:jOQIS5NG1d1Cei13@cluster0.8dfub8y.mongodb.net/e-commerce', {});

const connectDb = mongoose.connection;

connectDb.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
connectDb.once('open', () => {
  console.log('Conectado a la base de datos');
});

export { mongoose, connectDb };