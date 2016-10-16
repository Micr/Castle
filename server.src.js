import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import session from 'express-session';
import mongoose from 'mongoose';
import morgan from 'morgan';
import routes from './routes';

const app = express();

mongoose.connect('mongodb://localhost/castle');

app.use(session({
  secret: 'asdfasf',
  resave: true,
  saveUninitialized: true,
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Validator, must use before routers, if you are exporting validating
// functions
app.use(expressValidator({
  errorFormatter(param, msg, value) {
    const namespace = param.split('.');
    const root = namespace.shift();
    let formParam = root;

    while (namespace.length) {
      formParam += `[${namespace.shift()}]`;
    }
    return {
      param: formParam,
      msg,
      value,
    };
  },
}));

// Do not serve index.html as it is dynamically generated
app.use(express.static('build', { index: false }));
app.use((req, res, next) => {
  if (req.headers && req.headers['x-requested-with']) {
    req.isAjaxRequest = true;
  }
  next();
});
app.use('/', routes);

app.use(morgan('combined'));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!'); // eslint-disable-line no-console
});
