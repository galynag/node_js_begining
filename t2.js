var fs=require('fs');
//добавление в файл данные. нужно разобраться как добавить в массив...пока добавляет после скобок
fs.readFile('test.json', (err, data) => {
    if (err) throw err;
    var text = data.toString();
    //string to array
    text=JSON.parse(text);
    console.log(text);
    fs.appendFile('test.json', '"0": "stop"', (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
        fs.readFile('test.json', (err, data) => {
            if (err) throw err;
            text=JSON.parse(text);
            console.log(text);
        })
    });
});
