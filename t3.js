const fs = require('fs');
//удаление файла
fs.unlink('file_del.txt',(err)=>{
    if(err) throw err;
    console.log('success')
})