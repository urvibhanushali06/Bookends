require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path= require('path')
const shortid = require('shortid')
// const Razorpay= require('razorpay')

// instansiate razorpay
// var razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
//   });

// dotenv.config();
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))


app.use('/user' , require('./routes/userRouter'))
app.use('/api' , require('./routes/categoryRouter'))
app.use('/api' , require('./routes/upload'))
app.use('/api' , require('./routes/productRouter'))

// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

 app.get('/', (req, res) => {
     res.json({msg: "welcome to ecommerce"})
 })

//  payment Router
// app.post('/razorpay', async(req,res)=>{

//     const payment_capture = 1
//     const amount = 1
//     const currency = 'INR'

//     const options = {
//         amount : amount*100,
//         currency,
//         receipt: shortid.generate(),
//         payment_capture
//     }

//     try{
    
//     const response = await razorpay.orders.create(options)
//     console.log(response)
//     res.json({
//         id:response.id,
//         currency: response.currency,
//         amount: response.amount
//     })
//     }catch(error){
//         console.log(error)
//     }
// })
 
if(process.env.NODE_ENV=== 'production')
{
    app.use(express.static('client/build'))
    app.get('*', (req,res)=>{
        res.sendFile(path.join(___dirname, 'client' , 'build' , 'index.html'))
    })
}
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})