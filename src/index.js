const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();
server.express.use(cookieParser())

// Decode the JWT so that we can get the userid on every request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // Add the userId to future requests for future request to access
    console.log('userId', userId);
    req.userId = userId;
  }
  next();
});

// TODO Use express middleware to populate current user
console.log('test')
server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }
}, deets => {
  console.log(`Server is now running on port http://localhost:${deets.port}`);
});