const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session');
const passport = require('passport');


const basededatos={
    host: "mysqlrinzler.mysql.database.azure.com",
    user: "sebas@mysqlrinzler",
    password: "uno234567_Diez",
    database: "forumug"  
}

//Inicializacion
const app = express();
require('./helpers/passport');


//Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//Middlewares
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: new MYSQLStore(basededatos)
}));
app.use(flash());
app.use(express.urlencoded({extended: false}));
//app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());


//Variables Globales
app.use((req, resp, next) => {
    app.locals.success_msg = req.flash('success_msg');
    app.locals.Error_msg = req.flash('Error_msg');
    app.locals.user = null;
    app.locals.admin = null;
    
    if(req.session.rol=='Estudiante'){
        app.locals.user = req.user;
    }
    if(req.session.rol == 'Admin'){
        app.locals.user = req.user;
        app.locals.admin = req.user;
    }
    next();
});


//Rutas
app.use(require('./routes/rutas'));
app.use(require('./routes/Actividades_rutas'));
app.use(require('./routes/Profesores_rutas'));
app.use(require('./routes/Clases_rutas'));
app.use(require('./routes/Usuario_rutas'));
app.use(require('./routes/Reportes_rutas'));

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;