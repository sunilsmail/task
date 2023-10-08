jiexport interface User {
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

