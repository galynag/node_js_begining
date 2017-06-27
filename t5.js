var fs = require('fs');
//удаление папок. Важно писать путь к папке относительно файла js, который мы запускаем
fs.rmdir('mmm3',function(e){
    if(e){
        //do something with contents
        console.log('Error');
    } else {
        //debug
        console.log('remove');
    }
});