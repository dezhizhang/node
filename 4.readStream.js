
const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.resolve(__dirname,'./node.md'),{
    flags:'r',
    encoding:null,
    autoClose:true,
    emitClose:true,
    start:0,
    end:4,
    highWaterMark:2,
});

let arr = [];

rs.on('open',(fd) => {
    console.log(fd);
});

rs.on('close',() => {
    console.log('close');
});

rs.on('data',(data) => {
    arr.push(data);
    console.log(data);
});

rs.on('end',() => {
    console.log(Buffer.concat(arr).toString())
})

