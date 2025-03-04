// # divisible by 3 is Fizz, divisible by 5 is Buzz, divisible by both is FizzBuzz, otherwise return the number itself.
// ## Basic
function fizzBuzz(num: number) {
  for (let i = 1; i <= num; i++) {
    if (i % 15 === 0) console.log(`[FizzBuzz]`);
    else if (i % 3 === 0) console.log("[Fizz]");
    else if (i % 5 === 0) console.log(`[Buzz]`);
    else console.log(i);
  }
}

fizzBuzz(20);
// ## Fizz Bazz Decorator
function numberDecorator(num: number): string {
  return num.toString();
}

function fizzDecorator(num: number): string {
  if (num % 3 === 0) {
    return "Fizz";
  }
  return numberDecorator(num); // Call the base function if not divisible by 3
}

function buzzDecorator(num: number): string {
  if (num % 5 === 0) {
    return "Buzz";
  }
  return fizzDecorator(num); // Call the Fizz decorator if not divisible by 5
}

function fizzBuzzDecorator(num: number): string {
  if (num % 3 === 0 && num % 5 === 0) {
    return "FizzBuzz";
  }
  return buzzDecorator(num); // Call the Buzz decorator if not divisible by both 3 and 5
}

function fizzBuzzDemo(): void {
  for (let i = 1; i <= 100; i++) {
    console.log(fizzBuzzDecorator(i)); // Use the FizzBuzz decorator to get the final result
  }
}

fizzBuzzDemo();
