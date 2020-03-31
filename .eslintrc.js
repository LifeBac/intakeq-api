module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    // prettier
    'prettier/prettier': 'off',
    // Turn off to allow TS private in constructor
    'no-useless-constructor': 'off',
    'import/prefer-default-export': 'off',
    // Turn off to allow TS overloading
    'no-dupe-class-members': 'off',
  },
};
