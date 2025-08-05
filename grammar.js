/**
 * @file Gherkin grammar for tree-sitter
 * @author George Tsopanoglou <gtsop+github@protonmail.com>
 * @license AGPLv3
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "gherkin",

  rules: {
    source_file: $ => choice(
      $.feature_declaration
    ),

    feature_declaration: $ => seq(
      "Feature",
      ": ",
      $.title,
      optional($.description)
    ),

    title: _ => /.*\n/,

    description: _ => token(prec(-1, /[\s\S]+/))
  },
});
