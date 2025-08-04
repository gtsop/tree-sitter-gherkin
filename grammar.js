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
      $.feature_definition
    ),

    feature_definition: $ => seq(
      $._feature_line,
      optional(
        $._background_line
      ),
      optional(
        $._scenario_line
      )
    ),

    background: _ => /Background/,

    feature: _ => /Feature/,
    
    scenario: _ => /Scenario/,
    
    text: _ => /[a-zA-Z ]+/,

    _background_line: $ => seq($.background, ":", optional(repeat($._new_line))),

    _feature_line: $ => seq($.feature, ": ", $.text, optional(repeat($._new_line))),

    _scenario_line: $ => seq($.scenario, ": ", $.text, optional(repeat($._new_line))),

    _new_line: _ => "\n"
  }
});
