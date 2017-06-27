var fs = require('fs');
//отображение содержимого папки, даже скрытого
fs.stat('t2.js', (err,stats) =>{console.log(stats.isFile())});

fs.readdir('.', (err, files) => {
    let counter1 = 0, counter2 = 0;

    files.forEach(file => {
        fs.stat(file, function app(err, stats) {
            console.log('stat',stats.isFile());
            if (file.indexOf('.') == 0 && stats.isFile() === true) ++counter1
            else if (file.indexOf('.') != 0 && stats.isFile() === true) ++counter2;
        })
    });
        let counter3=counter1+counter2;
        console.log(`Количество файлов в папке:${counter3}, скрытых: ${counter1},файлов: ${counter2}`)
})