/* global $:true */
$(document).ready(function () {
  // Some code
});

function regexEscape(str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}