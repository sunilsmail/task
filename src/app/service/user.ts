export interface User {
    userName: string;
    password: string;
    role?: string;
  }

// Define your schema
const apiResponseSchema = {
  user: {
    id: { type: 'number', required: true },
    name: { type: 'string', required: true },
    email: { type: 'string', required: true, pattern: /^\S+@\S+\.\S+$/ },
  },
  posts: {
    type: 'array',
    required: true,
    minLength: 1,
    items: {
      type: 'object',
      properties: {
        id: { type: 'number', required: true },
        title: { type: 'string', required: true },
        content: { type: 'string', required: true },
      },
    },
  },
};

// Function to validate data against the schema
function validateApiResponse(data, schema) {
  const errors = {};

  function validateField(value, fieldSchema) {
    if (fieldSchema.required && (value === undefined || value === null)) {
      return `${fieldSchema.type} is required`;
    }

    if (fieldSchema.type && typeof value !== fieldSchema.type) {
      return `Invalid type. Expected ${fieldSchema.type}`;
    }

    if (
      fieldSchema.pattern &&
      typeof value === 'string' &&
      !fieldSchema.pattern.test(value)
    ) {
      return `Invalid format`;
    }

    return null; // No error
  }

  function validateObject(obj, objSchema) {
    const objErrors = {};

    for (const key in objSchema) {
      const fieldSchema = objSchema[key];
      const value = obj[key];
      const fieldError = validateField(value, fieldSchema);

      if (fieldError) {
        objErrors[key] = fieldError;
      }
    }

    return Object.keys(objErrors).length === 0 ? null : objErrors;
  }

  function validateArray(arr, arrSchema) {
    const arrErrors = [];

    if (!Array.isArray(arr)) {
      return ['Invalid type. Expected array'];
    }

    if (arrSchema.minLength && arr.length < arrSchema.minLength) {
      return [`Array must contain at least ${arrSchema.minLength} items`];
    }

    arr.forEach((item, index) => {
      const itemErrors = validateObject(item, arrSchema.items.properties);
      if (itemErrors) {
        arrErrors[index] = itemErrors;
      }
    });

    return arrErrors.length === 0 ? null : arrErrors;
  }

  for (const key in schema) {
    const fieldSchema = schema[key];
    const value = data[key];

    if (fieldSchema.type === 'object') {
      const objectErrors = validateObject(value, fieldSchema.properties);
      if (objectErrors) {
        errors[key] = objectErrors;
      }
    } else if (fieldSchema.type === 'array') {
      const arrayErrors = validateArray(value, fieldSchema);
      if (arrayErrors) {
        errors[key] = arrayErrors;
      }
    } else {
      const fieldError = validateField(value, fieldSchema);
      if (fieldError) {
        errors[key] = fieldError;
      }
    }
  }

  return Object.keys(errors).length === 0 ? null : errors;
}

// Example API response data
const apiResponseData = {
  user: {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  },
  posts: [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the content of the first post.',
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'This is the content of the second post.',
    },
  ],
};

// Perform validation
const validationErrors = validateApiResponse(apiResponseData, apiResponseSchema);

// Check if there are validation errors
if (validationErrors) {
  console.log('Validation errors:', validationErrors);
} else {
  console.log('API response is valid');
}


const schema = {
  propertyName: {
    type: 'string',
    required: true,
  },
};

function validateAgainstSchema(data, schema) {
  for (const key in schema) {
    if (schema[key].required && !data.hasOwnProperty(key)) {
      // Handle missing required property error
    } else if (typeof data[key] !== schema[key].type) {
      // Handle type validation error
    } else if (typeof schema[key] === 'object' && schema[key] !== null) {
      // Recursive call for nested schemas
      validateAgainstSchema(data[key], schema[key]);
    }
  }
}


function validateSchema(data, schema) {
  for (const key in schema) {
    if (typeof schema[key] === 'object') {
      // If the schema defines a nested object, recursively validate it.
      if (!validateSchema(data[key], schema[key])) {
        return false;
      }
    } else {
      // If the schema defines a type, check if the data matches the type.
      if (typeof data[key] !== schema[key]) {
        return false;
      }
    }
  }
  return true;
}

const dataToValidate = {
  name: 'John',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'Exampleville'
  }
};

const schema = {
  name: 'string',
  age: 'number',
  address: {
    street: 'string',
    city: 'string'
  }
};

if (validateSchema(dataToValidate, schema)) {
  console.log('Data is valid according to the schema.');
} else {
  console.log('Data is not valid according to the schema.');
}



function getRandomProperty(obj) {
  const keys = Object.keys(obj);
  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex];
  const randomValue = obj[randomKey];

  if (typeof randomValue === 'object' && randomValue !== null) {
    // If the random value is an object, recursively pick a random property from it.
    return `${randomKey}.${getRandomProperty(randomValue)}`;
  } else {
    // If the random value is not an object, return the random property key.
    return randomKey;
  }
}

const myComplexObject = {
  prop1: 'value1',
  prop2: {
    nestedProp1: 'nestedValue1',
    nestedProp2: 'nestedValue2',
  },
  prop3: 'value3',
};

const randomProperty = getRandomProperty(myComplexObject);
console.log(randomProperty); // This will log a random property path from the complex object.


function getRandomProperty(obj) {
  const keys = Object.keys(obj); // Get all the keys from the current object

  // Filter out keys that have nested objects (if you want to exclude nested objects)
  const nonObjectKeys = keys.filter(key => typeof obj[key] !== 'object');

  if (nonObjectKeys.length > 0) {
    // If there are non-object keys in the current object, pick a random one
    const randomIndex = Math.floor(Math.random() * nonObjectKeys.length);
    const randomKey = nonObjectKeys[randomIndex];
    return randomKey;
  } else {
    // If there are no non-object keys, recursively pick a random property from one of the nested objects
    const randomNestedObjectKey = keys[Math.floor(Math.random() * keys.length)];
    return getRandomProperty(obj[randomNestedObjectKey]);
  }
}

const complexObject = {
  prop1: 'value1',
  prop2: {
    nestedProp1: 'nestedValue1',
    nestedProp2: 'nestedValue2',
  },
  prop3: {
    nestedProp3: 'nestedValue3',
    nestedProp4: {
      deepProp1: 'deepValue1',
      deepProp2: 'deepValue2',
    },
  },
};

const randomProperty = getRandomProperty(complexObject);
console.log(randomProperty); // This will log a random property name from the complex object.


function randomNullify(obj, probability) {
    for (const key in obj) {
        if (Math.random() < probability) {
            obj[key] = null;
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            randomNullify(obj[key], probability);
        }
    }
}

// Example usage:
const complexObject = {
    prop1: {
        prop2: {
            prop3: 'value1',
            prop4: {
                prop5: 'value2',
            },
        },
        prop6: 'value3',
    },
    prop7: 'value4',
};

// Set a probability (e.g., 0.2 for 20% chance of setting to null)
const probability = 0.2;

randomNullify(complexObject, probability);

console.log(complexObject);


function updateRandomValueToNull(obj) {
  // Check if the given object is an array
  if (Array.isArray(obj)) {
    // If it's an array, choose a random index and update the value to null
    const randomIndex = Math.floor(Math.random() * obj.length);
    obj[randomIndex] = null;
  } else if (typeof obj === 'object' && obj !== null) {
    // If it's an object, iterate through its properties
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Recursively call the function for nested objects
        updateRandomValueToNull(obj[key]);
      }
    }
  }
}

// Example usage:
const complexObject = {
  a: {
    b: [1, 2, 3],
    c: {
      d: {
        e: 42,
      },
    },
  },
  f: [4, 5, 6],
};

updateRandomValueToNull(complexObject);
console.log(complexObject);


function randomlySetToNull(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        randomlySetToNull(obj[key]); // Recurse into nested objects
      } else if (Math.random() < 0.2) { // Adjust the probability as needed
        obj[key] = null;
      }
    }
  }
}

const complexObject = {
  a: {
    b: {
      c: "Some value",
      d: {
        e: "Another value",
        f: {
          g: "Yet another value",
        }
      }
    }
  }
};

randomlySetToNull(complexObject);

console.log(complexObject);


function randomNullUpdate(obj) {
  // Check if obj is an object
  if (typeof obj === 'object' && obj !== null) {
    // If it's an array, randomly select an index to update
    if (Array.isArray(obj)) {
      const randomIndex = Math.floor(Math.random() * obj.length);
      obj[randomIndex] = null;
    } else {
      // If it's an object, randomly select a property to update
      const keys = Object.keys(obj);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      obj[randomKey] = null;
    }

    // Recursively update nested objects and arrays
    for (const key in obj) {
      randomNullUpdate(obj[key]);
    }
  }
}

// Example usage
const complexObject = {
  prop1: {
    nested1: [1, 2, 3],
    nested2: {
      value: 'abc',
      nested3: [4, 5, 6]
    }
  },
  prop2: [7, 8, 9]
};

randomNullUpdate(complexObject);
console.log(complexObject);


function getObjectDepthWithFieldNames(obj, currentDepth = 1, fieldNames = []) {
  if (typeof obj !== 'object' || obj === null) {
    // If it's not an object, return the current depth and field names
    return { depth: currentDepth, fieldNames };
  }

  let maxDepth = currentDepth;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      fieldNames.push(key);
      const childDepth = getObjectDepthWithFieldNames(obj[key], currentDepth + 1, fieldNames);
      maxDepth = Math.max(maxDepth, childDepth.depth);
      fieldNames.pop(); // Remove the last added field name
    }
  }

  return { depth: maxDepth, fieldNames };
}

const myObject = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
};

const result = getObjectDepthWithFieldNames(myObject);
console.log(`Depth: ${result.depth}`);
console.log("Field Names: " + result.fieldNames.join(" > "));



