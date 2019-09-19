const axios = require('axios')

module.exports = {
    lintOnSave:false,
    publicPath:'./',
    devServer:{
        before:function(app,server){
            app.get('/api/lyric',function(req,res){
                var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
                axios.get(url, {
                    headers: {
                      referer: 'https://c.y.qq.com/',
                      host: 'c.y.qq.com'
                    },
                    params: req.query
                  }).then((response) => {
                    var ret = response.data
                    if (typeof ret === 'string') {
                      var reg = /^\w+\(({[^()]+})\)$/
                      var matches = ret.match(reg)
                      if (matches) {
                        ret = JSON.parse(matches[1])
                      }
                    }
                    res.json(ret)
                  }).catch((e) => {
                    console.log(e)
                  })              
            })
        }
    }
}