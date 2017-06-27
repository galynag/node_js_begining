var fs = require('fs');
//добавление папки, в данном случае с указанной вложенностью
fs.mkdir('mmm2/mmm3',function(e){
    if(e && e.code === 'EEXIST'){
        //do something with contents
        console.log(e);
    } else {
        console.log('well done');
    }
});