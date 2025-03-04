// Documentation for this file: https://prettier.io/en/configuration.html
const prettierPluginPath = require("./common/autoinstallers/rush-prettier/node_modules/prettier-plugin-packagejson");
module.exports = {
  // We use a larger print width because Prettier's word-wrapping seems to be tuned
  // for plain JavaScript without type annotations
  // semi: true,
  printWidth: 110,
  // "tabWidth": 2,

  // Use .gitattributes to manage newlines
  endOfLine: "auto",

  // Use single quotes instead of double quotes
  singleQuote: false,

  // For ES5, trailing commas cannot be used in function parameters; it is counterintuitive
  // to use them for arrays only
  trailingComma: "none",

  plugins: [prettierPluginPath]
};
