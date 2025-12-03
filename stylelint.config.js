export default {
  extends: ["stylelint-config-standard-scss", "stylelint-config-recess-order"],
  plugins: ["stylelint-scss"],
  rules: {
    "no-duplicate-selectors": true,
    "color-named": "never",
    "declaration-no-important": true,

    "max-nesting-depth": 3,
    "selector-max-compound-selectors": 4,

    "selector-max-id": null,

    "scss/at-rule-no-unknown": true,
    "scss/dollar-variable-colon-space-after": "always",
    "scss/dollar-variable-colon-space-before": "never",
    "scss/dollar-variable-no-missing-interpolation": true,
    "scss/double-slash-comment-whitespace-inside": "always",
    "scss/operator-no-newline-before": true,
    "scss/operator-no-unspaced": true,
    "scss/selector-no-redundant-nesting-selector": true,

    "value-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,

    "shorthand-property-no-redundant-values": true,
    "declaration-block-no-redundant-longhand-properties": true,

    "declaration-block-single-line-max-declarations": 1,

    "order/properties-alphabetical-order": null,
    "order/properties-order": null,
  },

  ignoreFiles: ["dist/**/*", "build/**/*", "node_modules/**/*"],
};
