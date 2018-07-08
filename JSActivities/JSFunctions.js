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
/*First call results:

Before function call works

Second call results:

TypeError: doesNotWork is not a function
at Object.<anonymous> (C:\Users\Mateo\Documents\GitHub\cs290example\JSActivities\JSFunctions.js:3:1)
at Module._compile (module.js:652:30)
at Object.Module._extensions..js (module.js:663:10)
at Module.load (module.js:565:32)
at tryModuleLoad (module.js:505:12)
at Function.Module._load (module.js:497:3)
at Function.Module.runMain (module.js:693:10)
at startup (bootstrap_node.js:191:16)
at bootstrap_node.js:612:3*/
