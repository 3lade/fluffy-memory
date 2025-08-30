const { validateJSON } = require('./index');

// Sample JSON strings to test
const jsonSamples = [
  '{"name": "Alice", "age": 25, "email": "alice@example.com"}', // valid
  '{"name": "Bob", "age": "twenty-five", "email": "bob@example.com"}', // invalid type
  '{"name": "Charlie", "email": "charlie@example.com"}', // missing key
  '{name: "No Quotes"}', // invalid syntax
  '{"name": "David", "age": 40}' // missing email
];

// Define required keys and expected types
const requiredKeys = ['name', 'age', 'email'];
const keyTypes = {
  name: 'string',
  age: 'number',
  email: 'string'
};

// Run validation for each sample
jsonSamples.forEach((json, index) => {
  console.log(`\nTesting JSON #${index + 1}: ${json}`);
  validateJSON(json, requiredKeys, keyTypes, (errors, isValid) => {
    console.log('Errors:', errors);
    console.log('Is Valid:', isValid);
    console.log('------------------');
  });
});
