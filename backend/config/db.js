import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

export const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        console.error("MONGO_URL is not defined. Add it to your .env file.")
        process.exit(1)
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb connected successfully..", conn.connection.host)
    } catch (error) {
        console.error("Something went wrong while connecting with mongodb", error)
        process.exit(1)
    }
}
