const express = require('express');
const cors = require('cors');
//const authRoutes = require('./routes/authRoutes');
//const taskRoutes = require('./routes/taskRoutes');
//const teamRoutes = require('./routes/teamRoutes');
//const commentRoutes = require('./routes/commentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/" , (req,res) => {
    res.json({message : "Welcome to TaskMaster API"});
});

module.exports = app;