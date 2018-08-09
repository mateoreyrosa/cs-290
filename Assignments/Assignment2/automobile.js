function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)

}

Automobile.prototype.print = function(arg){
  let y = this.year;
  let m = this.make;
  let mo = this.model;
  let type = this.type;
    if(arg === true){
        console.log(y + " " +  m + " "+ mo);
    }
    else{
      console.log(y + " " +  m + " "+ mo + " " + type);
    }
};

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];
/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator
and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr(comparator, array ){
    /*your code here*/
    let arr = [];
    //shallow copy
    arr = array;
    //sort() takes a 1, -1, or 0 which is why each compartor function returns a number
    arr.sort(function(a, b){return comparator(a, b)});
    return arr;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or
 greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator(int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of
 those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator(auto1, auto2){
    /* your code here*/
  if(auto1.year > auto2.year){
    return -1;
  }else if(auto1.year < auto2.year){
    return 1;
  }
  else {
    return 0;
  }
}

/*This compares two automobiles based on their make. It should be case insensitive and
makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator(auto1, auto2){
    /* your code here*/
    if(auto1.make.toLowerCase() > auto2.make.toLowerCase()){
      return 1;
    }else if(auto1.make.toLowerCase() < auto2.make.toLowerCase()){
      return -1;
    }
    else {
      return 0;
    }
}

/*This compares two automobiles based on their type. The ordering from "greatest" to
"least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed).
It should be case insensitive. If two cars are of equal type then the newest one by model
year should be considered "greater".*/
function typeComparator(auto1, auto2){
    /* your code here*/
    let comp1 = auto1.type.toLowerCase();
    let comp2 = auto2.type.toLowerCase();
    var arr = ["wagon", "suv", "pickup", "roadster"];
    if(arr.includes(comp1)){
      comp1 = arr.indexOf(comp1);
    }
    if(arr.includes(comp2)){
      comp2 = arr.indexOf(comp2)
    }
    //roadster is the "greatest"
    if(comp1 > comp2){
      return -1;
    }else if(comp1 < comp2){
      return 1;
    }
    else {
      return yearComparator(auto1, auto2);
    }
}
//cal printCars for the three sorting methods and adds the stars
function printAll(){
  console.log("*****");
  var year = sortArr(yearComparator, automobiles);
  printCars(year, "one", true, "year");
  var make = sortArr(makeComparator, automobiles);
  printCars(make, "two", true, "make");
  var type = sortArr(typeComparator, automobiles);
  printCars(type, "three", false, "type");
  console.log("*****")
}
//calls the print function or print prototype for each object in the array
function printCars(arg, m, print, kind){
  if(m != "one")
  console.log("\n");
  console.log("The cars sorted by " + kind + " are:");
  arg.forEach(m => m.print(print));

}

printAll();


/*Your program should output the following to the console.log, including
 the opening and closing 5 stars. All values in parenthesis should be replaced
 with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function
should be added to the Automobile class and accept a single boolean argument. If the argument
is 'true' then it prints "year make model type" with the year, make, model and type being the
values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */
