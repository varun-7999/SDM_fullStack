/* ==========================================================================
   10 JAVASCRIPT EXERCISES & SOLUTIONS
   Arrays, Objects, Functions, Closures & DOM
   ========================================================================== */

/* --------------------------------------------------------------------------
   EXERCISE 1: Reverse an Array In-Place
   Reverses an array without allocating a new array.
-------------------------------------------------------------------------- */
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}
console.log('Ex 1:', reverseArray([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]


/* --------------------------------------------------------------------------
   EXERCISE 2: Find Maximum and Minimum Values
   Returns both smallest and largest numbers from an array in a single traversal.
-------------------------------------------------------------------------- */
function findMinMax(arr) {
  return arr.reduce(
    (acc, val) => ({
      min: Math.min(acc.min, val),
      max: Math.max(acc.max, val),
    }),
    { min: Infinity, max: -Infinity }
  );
}
console.log('Ex 2:', findMinMax([12, 4, 56, 2, 89, -3])); // { min: -3, max: 89 }


/* --------------------------------------------------------------------------
   EXERCISE 3: Chunk an Array
   Splits an array into smaller sub-arrays of a specified chunk size.
-------------------------------------------------------------------------- */
function chunkArray(arr, size) {
  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
}
console.log('Ex 3:', chunkArray([1, 2, 3, 4, 5, 6, 7], 3)); // [[1, 2, 3], [4, 5, 6], [7]]


/* --------------------------------------------------------------------------
   EXERCISE 4: Count Word Occurrences (Frequency Map)
   Counts occurrences of each element in an array and returns an object summary.
-------------------------------------------------------------------------- */
function countFrequencies(words) {
  return words.reduce((freq, word) => {
    freq[word] = (freq[word] || 0) + 1;
    return freq;
  }, {});
}
console.log('Ex 4:', countFrequencies(['apple', 'banana', 'apple', 'orange', 'banana', 'apple']));
// { apple: 3, banana: 2, orange: 1 }


/* --------------------------------------------------------------------------
   EXERCISE 5: Check if an Object is Empty
   Determines whether an object contains any enumerable own properties.
-------------------------------------------------------------------------- */
function isObjectEmpty(obj) {
  return obj != null && Object.keys(obj).length === 0 && obj.constructor === Object;
}
console.log('Ex 5 (Empty):', isObjectEmpty({})); // true
console.log('Ex 5 (Non-empty):', isObjectEmpty({ a: 1 })); // false


/* --------------------------------------------------------------------------
   EXERCISE 6: Invert Object Key-Value Pairs
   Swaps keys and values of a single-level dictionary.
-------------------------------------------------------------------------- */
function invertObject(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});
}
console.log('Ex 6:', invertObject({ a: '1', b: '2', c: '3' })); // { '1': 'a', '2': 'b', '3': 'c' }


/* --------------------------------------------------------------------------
   EXERCISE 7: Function Currying
   Transforms a multi-argument function into a chain of unary functions.
-------------------------------------------------------------------------- */
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => curried.apply(this, [...args, ...nextArgs]);
  };
}
const multiplyThree = (a, b, c) => a * b * c;
const curriedMultiply = curry(multiplyThree);
console.log('Ex 7:', curriedMultiply(2)(3)(4)); // 24


/* --------------------------------------------------------------------------
   EXERCISE 8: Once Execution Wrapper
   Ensures a function can only be invoked a single time, returning cached output.
-------------------------------------------------------------------------- */
function once(fn) {
  let hasRun = false;
  let result;
  return function (...args) {
    if (!hasRun) {
      hasRun = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}
const initialize = once((msg) => `Initialized: ${msg}`);
console.log('Ex 8 (Run 1):', initialize('App v1')); // "Initialized: App v1"
console.log('Ex 8 (Run 2):', initialize('App v2')); // "Initialized: App v1"
