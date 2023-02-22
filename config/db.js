const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDb = async () => {
   const conn = await mongoose.connect(process.env.MONGO_CONN);

   console.log(`Connectted to ${conn.connection.host}`);
}

module.exports = connectDb;