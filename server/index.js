const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const signroute = require("./Routes/Sign");
const userdata = require("./Routes/Userdata");
const forgotpass = require("./Routes/Forgotpass");
const payment = require("./Routes/Payment");
const image = require("./Routes/Imagedat");

const app = express();

// Configure CORS to allow requests from specific origins
const allowedOrigins = [
  'https://66bee5e69b90ffb89ad8d597--thriving-gumption-ae189f.netlify.app',
  'https://thriving-gumption-ae189f.netlify.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://bahaxa8848:PTCxSrbm9D11GcgS@cluster01.uuxnv.mongodb.net/commondb?retryWrites=true&w=majority&appName=Cluster01', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch(err => {
  console.error('MongoDB connection error:', err.message); // Log just the message
});

// Routes
app.use(signroute);
app.use(userdata);
app.use(forgotpass);
app.use(payment);
app.use(image);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
