
const fs = require('fs');
const path = require('path');
const buf = Buffer.alloc(3);


fs.open(path.resolve(__dirname,'./node.md'),'r',438,(err,fd) => {
    fs.read(fd,buf,0,3,0,(err,bytesRead) => {
        fs.open(path.resolve(__dirname,'./copy.md'),'w',(err,wfd) => {
            fs.write(wfd,buf,0,3,0,(err,bytesWritten) => {
                console.log(bytesWritten);
            })
        });
    });
})