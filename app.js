const express = require('express');
const app = express();
const connectDB = require('./db/config');
const PORT =  process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(cors());

app.use(express.json());
// app.use(bodyParser.json());

app.use('/',
    express.static( path.resolve(__dirname, './uploads'))
);

app.get('/', (req, res)=>{
    res.send('Welcome to SMIU FYP Backend API');
});

app.use('/api/admin/', require('./routes/admin'));
app.use('/api/user/', require('./routes/user'));
app.use('/api/feedback', require('./routes/feedback'));

const start = () =>{
    try {
        connectDB();
        app.listen(PORT, ()=>{
            console.log(`${PORT} is Successfully Running!`)
        });
    } catch (error) {
        console.log('Error While Running the port!');
    }
};

// app.listen(3000, () => console.log('Running on port 3000'));

start();