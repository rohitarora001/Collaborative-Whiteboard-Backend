const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true })        
        console.log("connected successfully" , `${connection.connections[0].host}:${connection.connections[0].port}`)
    } catch (error) {
        console.log("Can not connect to DB" , error)
    }
}

module.exports = connectDB