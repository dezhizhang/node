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
