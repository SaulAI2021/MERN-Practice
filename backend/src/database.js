const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;

mongoose.connect(URI).then(()=> console.log('DB is connected'))
.catch((error)=> console.error('Connection failed',error.message))
