# node

### 发布订阅
```js

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
    console.log('属性:' + key+ "值" + value);
});

fs.readFile(path.resolve(__dirname,'./name.txt'),'utf-8',(err,data) => {
    events.emit('name',data)
});

fs.readFile(path.resolve(__dirname,'./age.txt'),'utf-8',(err,data) => {
    events.emit('age',data);
})

```
### 观察者模式
```js
class Subject {
  constructor(name) {
    this.name = name;
    this.observers = [];
    this.state = '开心';
  }
  attach(observer) {
    this.observers.push(observer);
  }
  setState(newState) {
    if (newState !== this.state) {
      this.state = newState;
      this.observers.forEach(observer => observer.update(this))
    }
  }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    update(subject) {
        console.log(subject.name + ":" + subject.state,this.name)
    }
}

let s = new Subject('小宝宝');
let o1 = new Observer('爸爸');
let o2 = new Observer('妈妈');

s.attach(o1);
s.attach(o2);

s.setState('不开心了')

```
### 读写流
```js
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
```