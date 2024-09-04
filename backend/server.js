const express = require('express');
const app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'}))
const audioRoute = require('./routes/audio');
const authRoute = require('./routes/auth');

app.use('/audio', audioRoute);
app.use('/auth', authRoute);

app.get('/', (req, res) => {
    res.end('express test rout')
})

const port = 8080;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})