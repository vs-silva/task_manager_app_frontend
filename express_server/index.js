import express from 'express';
import history from 'connect-history-api-fallback';

const app = express();
const port = process.env.PORT || 8080;

app.use(history({verbose: true}));
app.use('/', express.static('dist'));

app.listen(port);
