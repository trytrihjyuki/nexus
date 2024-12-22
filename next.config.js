// next.config.js
module.exports = {
  eslint: {
    rules: {
      'react/no-unknown-property': ['error', {
        ignore: [
          'intensity',  // Light intensity
          'position',   // Position arrays
          'args',       // Geometry/helper arguments
          'scale',      // Object scaling
          'object',     // Primitive objects
        ],
      }],
    },
  },
};
