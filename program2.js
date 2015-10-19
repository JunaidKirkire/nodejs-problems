//console.log(process.argv);

numbers = process.argv.splice(2, process.argv.length - 1);
//console.log(numbers);
numbers = numbers.map( function(obj) { return Number(obj); } );
var sum = 0;
for(var index = 0; index < numbers.length; index++) {
  sum += numbers[index];
}
console.log(sum);
