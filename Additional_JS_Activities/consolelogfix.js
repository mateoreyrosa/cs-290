function forEach(a, work) {
    for (var i = 0; i < a.length; i++) {
        work(a[i]);
    }
}

var arr = [1, 2, 3];

//forEach(arr,console.log); <--- This will work.

var newLog = console.log.bind(console); //newLog now has the console.log function with a fixed context of console.

forEach(arr, newLog);
