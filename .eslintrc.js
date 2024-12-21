module.exports = {
    extends: ['next', 'next/core-web-vitals'],
    rules: {
      'react/no-unknown-property': ['error', {
        ignore: [
          'intensity',  // For light intensity
          'position',   // For object positions
          'args',       // For helper arguments
          'scale',      // For scaling
          'object',     // For primitive objects
        ],
      }],
    },
  };
  