const mongoose = require("mongoose");

main().then(() => console.log('DB is connected!')).catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = main