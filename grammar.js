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
      optional($.background),
      repeat($.scenario)
    ),

    title: _ => /.+\n/,

    description: $ => repeat1(seq($.description_line, $._newline)),

    description_line: _ => token(prec(-1, /.+/)),

    background: $ => seq(
      "Background",
      ":\n",
      optional(repeat($.given)),
      optional(repeat($.when)),
      optional(repeat($.then)),
    ),

    scenario: $ => seq(
      "Scenario",
      ": ",
      $.title,
      optional(repeat($.given)),
      optional(repeat($.when)),
      optional(repeat($.then)),
    ),

    given: $ => seq("Given", " ", $.step),
    when: $ => seq("When", " ", $.step),
    then: $ => seq("Then", " ", $.step),

    step: _ => /.+\n/,

    _newline: _ => /\r?\n/
  },
});
