// 下载任意一个网页的内容
var http = require("http");
var request = require('request');
var Iconv = require('iconv-lite');

function download(url, callback) {
    http.get(url, (req, res) => {
        request({
            encoding: null,
            url: url
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                let result = Iconv.decode(body, 'gb2312').toString();
                callback(result);
            }
        });

    }).on("error", (e) => {
        console.log('网页解析失败');
        callback(null);
    });
}

exports.download = download;