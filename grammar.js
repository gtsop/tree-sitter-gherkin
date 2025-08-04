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
    source_file: $ => repeat(choice(
      $.feature_definition
    )),


    feature_definition: $ => seq(
      $.feature,
      ":",
      " ",
      $.text
    ),

    feature: _ => /Feature/,
    
    text: _ => /[a-zA-Z ]+/
  }
});
