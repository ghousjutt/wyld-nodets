import mongoose from 'mongoose';
// mongodb+srv://hassan:hassan123@cluster0.cnj46.mongodb.net/wyld-pos?retryWrites=true&w=majority
// mongodb://localhost:27017/wyld-pos
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://vidlyuserpassword:node0510@cluster0.szwyk.mongodb.net/?retryWrites=true&w=majority', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB is connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to MongoDB ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
