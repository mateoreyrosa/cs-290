//First funciton call works
//Will print statement due to JS hoisting
print();
function print(){
console.log("Before function call works");
}
//Second call will fail due to variable assignment of the function
doesNotWork();
var doesNotWork = function(){
console.log("Before variable function does not work");
}
