module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    "no-unused-expressions":"off",
    "no-unused-vars": "off",
    "no-var": "error",
    "prefer-arrow-callback": "error",
    "semi": "error",
    "space-before-function-paren":"off",
    "@typescript-eslint/no-unused-vars": [
      "error"
    ],
    // React linting rules
    "react/boolean-prop-naming": ["error", { "rule": "^(is|has)[A-Z]([A-Za-z0-9]?)+" }],
    "react/button-has-type": "error",
    "react/default-props-match-prop-types": "error",
    "react/no-danger":"error",
    "react/no-unused-state": "error",
    "react/no-will-update-set-state": "error",
    "react/prefer-es6-class": ["error", "never"],
    "react/prefer-stateless-function": "error",
    "react/react-in-jsx-scope": "off", // TODO: Validate that this needs to be off
    "react/no-redundant-should-component-update": "error",
    "react/no-string-refs": ["error", {"noTemplateLiterals": true}],
    "react/no-this-in-sfc": "error",
    "react/no-typos": "error",
    "react/no-unsafe": ["error", { "checkAliases": true }],
    "react/no-unused-prop-types": "error",
    "react/no-unused-state": "error",
    "react/prefer-stateless-function": "error",
    "react/self-closing-comp": "error",
    "react/sort-comp": "error",
    "react/void-dom-elements-no-children": "error",
    "react/style-prop-object": "error",
    "react/static-property-placement": ["error", "static public field"],
    "react/state-in-constructor": "error",
    "react/no-access-state-in-setstate": "error",
    "react/no-adjacent-inline-elements": "error"
  },
  overrides: [
    {
      "files": ["enums/*.tsx", "enums/*.ts"],
      "rules": {
        "no-unused-vars": ["off"]
      }
    }
  ],
  "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
                           // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                           // default to latest and warns if missing
                           // It will default to "detect" in the future
      "flowVersion": "0.53" // Flow version
    },
    "propWrapperFunctions": [
        // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
        "forbidExtraProps",
        {"property": "freeze", "object": "Object"},
        {"property": "myFavoriteWrapper"}
    ],
    "linkComponents": [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      {"name": "Link", "linkAttribute": "to"}
    ]
  }
}
