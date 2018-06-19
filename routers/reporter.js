var router = require('koa-router')();
const requestPN = require('request-promise-native');

const hyperledgerServerUrl = "http://localhost:5000";

router.prefix('/reporter');

router.get('/',async function(ctx,next){
    try {
        const _membercode = ctx.request.headers.membercode || ctx.request.query.membercode
        const _year = ctx.request.headers.year || ctx.request.query.year
        const _month = ctx.request.headers.month|| ctx.request.query.month
        console.log(_membercode);
        console.log(_year);
        console.log(_month);
        // http://localhost:5000/Login?ACCOUNT=pepro107&PASSWORD=qazwsx5566
        let options = {
            uri: hyperledgerServerUrl+"/getSumByMonthYear",
            qs: {
                MEMBERCODE: _membercode,
                YEAR: _year,
                MONTH:_month
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
