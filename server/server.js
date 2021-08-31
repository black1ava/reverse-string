const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, function(){
	console.log(`Server is running on port ${ PORT }`);
});