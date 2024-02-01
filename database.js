mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ibm').then(()=>
{
    console.log(`connected successfully`)
}).catch((error)=>{console.log(error)})

Schema = mongoose.Schema({
    name:String,
    mail:String,
    age:Number
  
})

StudentModel = mongoose.model('Student',Schema);

module.exports = StudentModel