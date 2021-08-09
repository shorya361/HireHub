const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const employerRoutes = require('./routes/employerRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const upload = multer();

app.use(cookieParser());

app.use('/profile', express.static('models/profileImages'));

app.use('/user', userRoutes);

app.use('/employer', employerRoutes);

app.use('/candidate', candidateRoutes);

mongoose
  .connect(
    'mongodb+srv://punk_GTS:blackcaps434@shorya.moefa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then((result) => {
    app.listen(process.env.PORT || 8080);
    console.log('server is running smooth');
  })
  .catch((err) => {
    console.log(err);
  });
