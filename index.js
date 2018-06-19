const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const path = require('path')
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
// const cors = require('kcors');

// const index = require('./routers/index');
const members = require('./routers/members');
// const clubs = require('./routers/clubs');
// const discuss = require('./routers/discuss');
// const memberlists = require('./routers/memberlists');
// const meets = require('./routers/meets');

// error handler
onerror(app);

// middlewares
app.use(bodyparser());
app.use(json({pretty: false}));
app.use(logger());
// app.use(cors());
app.use(require('koa-static')(__dirname + '/public'));

// app.use(views(__dirname + '/views', {
//   extension: 'jade'
// }));

// app.use(views(path.join(__dirname, './views'), {
//   extension: 'ejs'
// }))

// app.use( async ( ctx ) => {
//   let title = 'hello koa2'
//   await ctx.render('index', {
//     title,
//   })
// })

// // logger
// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

// routes
// app.use(index.routes(), index.allowedMethods());
app.use(members.routes(), members.allowedMethods());
// app.use(clubs.routes(), clubs.allowedMethods());
// app.use(discuss.routes(), discuss.allowedMethods());
// app.use(memberlists.routes(), memberlists.allowedMethods());
// app.use(meets.routes(), meets.allowedMethods());

module.exports = app;
