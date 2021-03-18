const express = require('express');
//const session = require('express-session');
const routes = require('./controller');
//const exphbs = require('express-handlebars');
//const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
//const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// const hbs = exphbs.create({ helpers });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// const sess = {
//   secret: 'Dc0d3',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };
 
//app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});

