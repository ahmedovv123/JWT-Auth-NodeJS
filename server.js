const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
})

function initial(){
  Role.create({
    id: 1,
    name: 'user'
  });

  Role.create({
    id: 2,
    name: 'moderator'
  });

  Role.create({
    id: 3,
    name: 'admin'
  });
}

// Simple route
app.get('/ping', (req,res) => {
  res.json({ message: 'pong' });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

