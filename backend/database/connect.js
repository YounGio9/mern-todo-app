const mongoose = require('mongoose')

const connect = async () => {
   const uri = process.env.MONGO_URI

   try {
      await mongoose.connect(uri, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      console.log('connected to mongo DB')
   } catch (error) {
      console.error(error.message)
   }
}

module.exports = connect
