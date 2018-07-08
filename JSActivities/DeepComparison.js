//Description: Completes a comparison of two types passed via parameter
//including a deep comparison of objects all using Javascript
//Written by: Mateo Rey-Rosa
let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

//Function completes a deep comparison of two objects, and any other comparable primitive type (int, string .. etc)
function deepEqual(x, y){
  //checks to see if the parameters are both objects and not null
  if((typeof(x) == "object" && x != null) && (typeof(y) == "object" && y != null))
  {
    //gets the property names of each object
    var left = Object.keys(x);
    var right = Object.keys(y);
    //for in loop for every property name in both objects
        for(elemx in left){
          for(elemy in right){
            //checks to see if each property is in the other object and vice versa, it's a two way if, not an iff
            if((!(right.includes(left[elemx]))) || (!(left.includes(right[elemy])))){
              return false;
            }
            //checks if the property names are the same at that instance in the for loop
            if(left[elemx] == right[elemy]){
              //if the property names are the same then compare the values stored in that property by calling deepEqual again
              if(!(deepEqual(x[left[elemx]], y[left[elemy]]))){
                  return false;
              }
            }
          }
        }
        //If false has not already been returned then return true, comparison has met all of the requirements
        return true;
  }
  else
  {
    //if the two parameters are not both objects than compare straight up
    return x == y;
  }

}
