const mongoose = require("mongoose");
require('dotenv').config()

const MONGOURI = process.env.MANGO_URL

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("Connected to DB !!")
  } catch(e) {
    console.log(e);
    throw e;
  }
}

module.exports = InitiateMongoServer;
