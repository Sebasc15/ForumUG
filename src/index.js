require('dotenv').config();

const app = require('./server');
require('./database');

app.listen(app.get('port'), ()=>{
    console.log('Server escuchando por el puerto', app.get('port'));
});