// 传递本地excel文件

// 文件依赖
const fs = require('fs');

module.exports = (req, res) => {
    // The must headers.
    res.setHeader('Content-type', 'application/octet-stream');
    // response.setContentType("application/vnd.ms-excel;charset=UTF-8");
    res.setHeader('Content-Disposition', 'attachment;filename=data.xlsx'); // 'aaa.txt' can be customized.
    var fileStream = fs.createReadStream('./data.xlsx');
    fileStream.on('data', function(data) {
        res.write(data, 'binary');
    });
    fileStream.on('end', function() {
        res.end('ok');
        console.log('The file has been downloaded successfully!');
    });

};