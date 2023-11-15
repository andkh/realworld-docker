const express = require('express');
const axios = require('axios');
const { Schema, model } = require('mongoose');

const { connectDb } = require('./helpers/db');
const { host, port, db, authApiUrl } = require('./configuration');

const app = express();
const postSchema = new Schema({
  name: String,
});
const Post = model('Post', postSchema);

const startServer = () => {
	app.listen(port, async () => {
		console.log(`Started api servie on port: ${port}`);
		console.log(`On host: ${host}`);
		console.log(`Our DB: ${db}`);

		try {
			const silence = new Post({ name: 'Silcence' });
			const savedSilence = await silence.save();
			console.log('savedSilence with volumes', savedSilence);
		} catch(error) {
			console.error(error);
		}
	});
};

app.get('/test', (req, res) => {
	res.send('Correctly!')
});

app.get('/api/testapidata', (req, res) => {
  res.json({
    testWithApi: true,
  });
});

app.get('/testwithcurrentuser', (req, res) => {
  axios.default.get(`${authApiUrl}/currentUser`).then(response => {
	res.json({
      testwithcurrentuser: true,
      currentUserFromAuth: response.data,
    });
  });
});

connectDb()
	.on('error', console.log)
  	.on('disconnected', connectDb)
	.on('open', startServer);