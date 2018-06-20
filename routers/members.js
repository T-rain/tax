var router = require('koa-router')();
const requestPN = require('request-promise-native');

const hyperledgerServerUrl = "http://localhost:5000";

router.prefix('/members');

router.get('/',async function(ctx,next){
    try {
        const _account = ctx.request.headers.account || ctx.request.query.account;
        const _password = ctx.request.headers.password || ctx.request.query.password;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     d = ctx.request.headers.password || ctx.request.query.password
        console.log(_account);
        console.log(_password);
        // http://localhost:5000/Login?ACCOUNT=pepro107&PASSWORD=qazwsx5566
        let options = {
            uri: hyperledgerServerUrl+"/Login",
            qs: {
                ACCOUNT: _account,
                PASSWORD: _password
            },                                                                                                                                                                                                                                                                                                                                              
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                'Content-Type': 'application/json'
            },
            json: true 
        };

        let result = await requestPN(options);
        console.dir(result);
        let info = JSON.parse(result.data);
        ctx.status = 200;
        ctx.body = info;
    } catch (e) {
        console.dir(e);
        ctx.status = 400;
        ctx.body = "error";
    }
});

module.exports = router;
