testList();

function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];

       // result.push( function() {alert(item + ' ' + list[i])} );
       //alert = console.log in node essentially, change depending on where code is run
       //Each element of result saves a new function creating a new closesure for each
        result[i] = function(){
        return alert(item + ' ' + list[i]);
        }(i);
        //(i); calls the function immediately 

    }
    return result;
}

function testList() {
    var fnlist = buildList([1,2,3]);

    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

//If not running code  on chrome or IE browser please replace alert with console.log
