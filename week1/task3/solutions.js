'use strict';

function reverseString(str) {
  let reversed = '';

  for (let index = str.length - 1; index >= 0; index -= 1) {
    reversed += str[index];
  }

  return reversed;
}

function fizzBuzz() {
  const results = [];

  for (let number = 1; number <= 100; number += 1) {
    let result = '';

    if (number % 3 === 0) {
      result += 'Fizz';
    }

    if (number % 5 === 0) {
      result += 'Buzz';
    }

    results.push(result || number);
  }

  results.forEach((result) => console.log(result));
  return results;
}

function findMax(arr) {
  if (arr.length === 0) {
    throw new Error('findMax requires a non-empty array');
  }

  let largest = arr[0];

  for (let index = 1; index < arr.length; index += 1) {
    if (arr[index] > largest) {
      largest = arr[index];
    }
  }

  return largest;
}

function isPalindrome(str) {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized === reverseString(normalized);
}

function removeDuplicates(arr) {
  const unique = [];

  arr.forEach((item) => {
    if (!unique.includes(item)) {
      unique.push(item);
    }
  });

  return unique;
}

function countCharacters(str) {
  const counts = {};

  for (const character of str) {
    counts[character] = (counts[character] || 0) + 1;
  }

  return counts;
}

function flattenArray(arr) {
  const flattened = [];

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      flattened.push(...flattenArray(item));
    } else {
      flattened.push(item);
    }
  });

  return flattened;
}

function debounce(func, delay) {
  let timeoutId;

  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function titleCase(str) {
  return str.replace(/\S+/g, (word) => (
    word.charAt(0).toUpperCase() + word.slice(1)
  ));
}

function factorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial requires a non-negative integer');
  }

  if (n === 0) {
    return 1;
  }

  return n * factorial(n - 1);
}

module.exports = {
  reverseString,
  fizzBuzz,
  findMax,
  isPalindrome,
  removeDuplicates,
  countCharacters,
  flattenArray,
  debounce,
  titleCase,
  factorial,
};
