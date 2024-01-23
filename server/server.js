const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/router');
const errorMiddleware = require('./middleware/error-middleware');
const UserService = require('./services/user-service');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({origin: ["http://localhost:3000", "http://127.0.0.1:3000"]
                        , credentials: true, sameSite: 'none'}));
app.use(express.json()); 
app.use('/api', router);
app.use(cookieParser());
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server on localhost:${PORT}`));