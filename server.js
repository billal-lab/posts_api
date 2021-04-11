const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost:27017/poster-app', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/v1/user',require('./routes/users'))
app.use('/api/v1/posts',require('./routes/posts'))


app.listen(3000,()=>{
    console.log('listening on port 3000')
})