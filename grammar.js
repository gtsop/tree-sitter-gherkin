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
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
