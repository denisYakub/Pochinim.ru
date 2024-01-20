const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/router');
const errorMiddleware = require('./middleware/error-middleware');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json()); 
app.use(cors());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server on localhost:${PORT}`));
