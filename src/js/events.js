// Listen for a ready DOM.
if (document.readyState != 'loading'){
  init();
} else if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', init());
} else {
  document.attachEvent('onreadystatechange', function () {
    if (document.readyState != 'loading')
      init();
  });
}

// Update the text and register a generate button click listener.
function init() {
  update_text();

  // Listen for generate button clicks.
  var button = document.getElementById('generate-button');

  if (button.addEventListener) {
    button.addEventListener('click', function () {
      update_text();
      return false;
    });
  } else {
    button.attachEvent('onclick', function () {
      update_text();
      return false;
    });
  }
}