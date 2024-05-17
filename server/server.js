const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/router');
const errorMiddleware = require('./middleware/error-middleware');
//===========================
const path = require('path');
//===========================
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true,
    exposedHeaders: ['ETag'],
}));
app.use(express.json()); 
//===========================
app.use('/images', express.static(path.join(__dirname, 'images')));
//===========================
app.use('/api', router);
app.use(cookieParser());
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server on localhost:${PORT}`));