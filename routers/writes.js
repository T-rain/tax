var router = require('koa-router')();
const requestPN = require('request-promise-native');

const hyperledgerServerUrl = "http://localhost:5000";

router.prefix('/writes');


// http://localhost:5000/createTransaction?COOKIE_KEY=1FB741726CDC81B938D6&S_ID=87&CREDIT=10&DEBIT=100&CONTENT=

router.get('/',async function(ctx,next){
    try {

        const _ck =  ctx.request.headers.ck || ctx.request.query.ck
        const _sid = ctx.request.headers.sid || ctx.request.query.sid
        const _credit = ctx.request.headers.credit || ctx.request.query.credit || 0
        const _debit = ctx.request.headers.debit || ctx.request.query.debit || 0

        let options = {
            uri: hyperledgerServerUrl+"/Login",
            qs: {
                COOKIE_KEY: _ck,
                S_ID: _sid,
                CREDIT: _credit,
                DEBIT: _debit,
                CONTENT: ""
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                'Content-Type': 'application/json'
            },
            json: true 
        };
        

        let result = await requestPN(options);
        ctx.status = 200;
        ctx.body = result;
    } catch (e) {
        ctx.status = 400;
        ctx.body = "error";
    }
});

module.exports = router;