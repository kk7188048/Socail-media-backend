import mongoose  from "mongoose";



const connectDB = async()=> {
    try{
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
          console.log(`\nConnected to MongoDB: ${connection.connection.host}`);
    } catch(error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

export default connectDB