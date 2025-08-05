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
      $.feature
    ),

    feature: $ => seq(
      "Feature",
      ": ",
      $.title,
      optional($.description),
      $.scenario
    ),

    title: _ => /.+\n/,

    description: $ => repeat1(seq($.description_line, $._newline)),

    description_line: _ => token(prec(-1, /.+/)),

    scenario: $ => seq(
      "Scenario",
      ": ",
      $.title
    ),

    _newline: _ => /\r?\n/
  },
});
