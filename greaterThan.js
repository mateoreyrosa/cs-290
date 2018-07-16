function greaterThan(n) {
  console.log(n);
  return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10);
console.log(greaterThan10(11));
