

function * read() {
    yield "vue";
    yield "vite";
    yield "node";
}


let it = read();
console.log(it.next())