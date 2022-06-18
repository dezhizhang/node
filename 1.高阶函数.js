


function core() {
    return function() {
        return 'hello'
    }
}

const res = core();
console.log(res());