const express = require('express');

const app = express();

app.use(express.static('./dist/gestion-doc'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/gestion-doc/'}),
);

app.listen(process.env.PORT || 8080);
