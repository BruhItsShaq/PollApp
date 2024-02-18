const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router'); // Import router module
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(router);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});