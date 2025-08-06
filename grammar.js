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
      "Feature:",
      " ",
      $.title,
      optional($.description),
      optional($.background),
      repeat($.scenario)
    ),

    title: _ => /.+\n/,

    description: $ => repeat1(seq($.description_line, $._newline)),

    description_line: _ => token(prec(-1, /.+/)),

    background: $ => seq(
      "Background:",
      "\n",
      $.steps
    ),

    scenario: $ => seq(
      "Scenario:",
      " ",
      $.title,
      $.steps
    ),

    steps: $ => repeat1(
      choice(
        $.given,
        $.when,
        $.then,
      )
    ),

    given: $ => seq(
      "Given", " ", $.step,
      optional(repeat($.and))
    ),

    when: $ => seq(
      "When", " ", $.step,
      optional(repeat($.and))
    ),

    then: $ => seq(
      "Then", " ", $.step,
      optional(repeat($.and))
    ),

    and: $ => seq("And", " ", $.step),

    step: $ => repeat1(
      choice(
        $.string,
        token(prec(-1, /[^"\n]+/))
      )
    ),

    _newline: _ => /\r?\n/,

    string: _ => token(seq('"', repeat(/[^"\n\\]/), '"')),
  },
});
