

const fs = require('fs');
const path = require('path');

const events = {
    _array:[],
    on(callback) {
        this._array.push(callback);
    },
    emit(key,value) {
        this._array.map(fn => fn(key,value))
    }
}


events.on((key,value) => {
    console.log(key,value)
})


fs.readFile(path.resolve(__dirname,'./name.txt'),'utf-8',(err,data) => {
    events.emit('name',data);
});

fs.readFile(path.resolve(__dirname,'./age.txt'),'utf-8',(err,data) => {
    events.emit('age',data)
})