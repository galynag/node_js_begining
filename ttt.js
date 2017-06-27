var fs=require('fs');
//добавление к строке текста
fs.appendFile('text.txt', '\nstop', (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
    fs.readFile('text.txt', (err, data) => {
        if (err) throw err;
        let text = data.toString();
        console.log(text);})
});

