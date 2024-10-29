import mongoose from "mongoose";

export  async function connect (){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connect', () => {
            console.log('Database connected')
        })
        connection.on('error', (err) => {
            console.log("MongoDB connection error")
            console.log(err)
            process.exit()
        })
        
    } catch (error) {
        console.log('Something happen bad with db connection')
        console.log(error)
        
    }
}