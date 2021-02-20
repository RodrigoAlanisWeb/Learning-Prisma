const express = require('express');
const app = express();

const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());

app.set('port',process.env.PORT || 5000);

app.use(require('./routes/user'));
app.use(require('./routes/task'));

app.listen(app.get('port'),() => {
    console.log("Server On Port", app.get('port'));
})