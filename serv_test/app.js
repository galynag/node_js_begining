var http = require("http");
var fs = require("fs");


let counterMain = 0;
let counterDownload = 0;
let justData='';

http.createServer(function(request, response){
    let url = request.url;


    if (url === '/main') {
        let now = new Date();
        let hour = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        justData = now.toString();
        let data = `${hour}:${minutes}:${seconds} ${request.method} ${url}`;
        console.log(data);
        fs.appendFile("app.log", data + "\n");
    }

    switch(url) {
        case '/main':
            counterDownload = 0;
            ++counterMain;
             loadPageCombaine('template/header','template/nav','main' ,'template/footer', counterMain);

            // addLogLoadingPage();
            break;
        case '/main.css': {
            response.writeHead(200, {'Content-Type': 'text/css'});
            fs.createReadStream("main.css").pipe(response);
            break;

        }
        case '/price.zip':
            ++counterDownload;
            if (counterDownload  == 1) {
                fs.appendFile("counterDownload.txt", `${justData} / price.zip / 1 \n`)
            }
            break;

        default:
            loadPageCombaine('template/header','template/nav','404','template/footer');
            break;
    };
    addLogLoadingPage = (request) => {
        var now = new Date();
        var hour = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
        console.log(data);
        fs.appendFile("server.log", data + "\n");
    }
    // //функция для загрузки одной страницы
    // function loadPage(filename){
    //     fs.readFile(filename+'.html', function(error, data){
    //         if(error){
    //             response.statusCode = 404;
    //             response.end("Ресурс не найден!");
    //         }
    //         else{
    //             response.end(data);
    //         }
    //         return;
    //     });
    // }

    function loadPageCombaine(header,nav,main,footer, counter){
        fs.readFile(header+'.html', function(error, data){
            var usersPage;
            if(error){
                response.statusCode = 404;
                response.end("Ресурс не найден!");
            }
            else{
                usersPage=data.toString();
                fs.readFile(nav+'.html', function(error, data) {
                    if (error) {
                        response.statusCode = 404;
                        response.end("Ресурс не найден!");
                    }
                    else {
                        usersPage = usersPage + data.toString();
                        fs.readFile(main + '.html', "utf8", function(error, data){

                            if (error) {
                                response.statusCode = 404;
                                response.end("Ресурс не найден!");
                            }
                            else {
                                datamain = data.replace("{counter}", counter);
                                usersPage = usersPage + datamain.toString();
                                        fs.readFile(footer + '.html', function (error, data) {
                                            if (error) {
                                                response.statusCode = 404;
                                                response.end("Ресурс не найден!");
                                            }
                                            else {
                                                usersPage = usersPage + data.toString();
                                                response.end(usersPage);
                                                return;
                                            }
                                        });
                            }
                        });
                    }
                });
            }
        });
    }
}).listen(3000);

// https://habrahabr.ru/post/327440/
// // До этого мы уже получили path и prePath. Теперь осталось понять, какие запросы
// // мы получаем. Отсеиваем все запросы по точке, так чтобы туда попали только запросы к
// // файлам, например: style.css, test.js, song.mp3
// if(/\./.test(path)) {
//     if(path == 'favicon.ico') {
//         // Если нужна фавиконка - возвращаем её, путь для неё всегда будет 'favicon.ico'
//         // Получается, если добавить в начале prePath, будет: '/var/www/html/nodejs/routing/favicon.ico'.
//         // Не забываем про return, чтобы сервер даже не пытался искать файлы дальше.
//         let readStream = fs.createReadStream(prePath+path);
//         readStream.pipe(res);
//         return;
//     }
//     else{
//         // А вот если у нас не иконка, то нам нужно понять, что это за файл, и сделать нужную
//         // запись в res.head, чтобы браузер понял, что он получил именно то, что и ожидал.
//         // На данный момент мне нужны css, js и mp3 от сервера, так что я заполнил только
//         // эти случаи, но, на самом деле, стоит написать отдельный модуль для этого.
//         if(/\.mp3$/gi.test(path)) {
//             res.writeHead(200, {
//                 'Content-Type': 'audio/mpeg'
//             });
//         }
//         else if(/\.css$/gi.test(path)) {
//             res.writeHead(200, {
//                 'Content-Type': 'text/css'
//             });
//         }
//         else if(/\.js$/gi.test(path)) {
//             res.writeHead(200, {
//                 'Content-Type': 'application/javascript'
//             });
//         }
//         // Опять же-таки, отдаём потом серверу и пишем return, чтобы он не шёл дальше.
//         let readStream = fs.createReadStream(prePath+path);
//         readStream.pipe(res);
//         return;
//     }
// }