const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongoose connected " , conn.connection.host)
    } catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDb