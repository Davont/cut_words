var nodejieba = require("nodejieba");
var fs = require("fs")
var path = require("path")

function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            let arr = []
            //遍历读取到的文件列表
            files.forEach(function (filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                //console.log(filedir)
                arr.push(filedir)
            });
            console.log(arr)
            arr.forEach(element => {
                fs.readFile(element, function (err, data) {
                    if (err) {
                        return console.error(err);
                    }
                    let sentence = data.toString();
                    var result = nodejieba.extract(sentence, 50);
                    console.log("歌曲地址--" + element);
                    console.log("词频分析结果：");
                    //console.log(result);
                    let afterArr = []
                    afterArr = result.filter((value, key, arr) => {
                        if (key > 4 && value.word.length < 10) {
                            return true
                        }
                    })
                    console.log(afterArr)
                });
            });

        }
    });


}
fileDisplay('./comments');