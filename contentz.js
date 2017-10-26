$(document).ready(function() {
  // alert('ready!');
  // script for injection
  var s = document.createElement('script');
  s.src = chrome.extension.getURL('injected.js');
  s.id = 'killmeplz';
  (document.head || document.documentElement).appendChild(s);

  window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
      return;
    // pick name
    if (event.data.type && (event.data.type == "FROM_CHROME_EXT")) {
      var myNameIs = regexEscape(event.data.text);
      chrome.storage.sync.set({'name': myNameIs}, function() {
        // remove injection
        $('#killmeplz').remove();

        var audio = new Audio('http://princezze.free.fr/sounds/Opbeep.wav');
        var str = '';
        audio.loop = false;
        $('#leftdiv').bind('DOMNodeInserted', function(event) {
          chrome.storage.sync.get(null, function (myresults) {
            // alert(JSON.stringify(myresults));
            // alert('STATE '+myresults.state);
            // if(myresults.pm) alert('ON ALL');
            // if(myresults.sound) alert('ON SOUND');
            $( "#leftdiv div" ).last().hide().show(800);
            if(myresults.pm){
              str = $( "#leftdiv div" ).last().text();
              var regex = new RegExp(myresults.name, "gi");
              if(regex.test(str)){
                if(!$('#myownlog').length){
                  $( "#privatdiv" ).after( '<div id="myownlog"></div>' );
                }
                $('#myownlog').append('<div class="js-killlog">'+str+'</div>');
                $('#myownlog div').last().hide().show(200);
                $('.js-killlog').on('click', function(e) {
                  $(this).hide(500);
                });
                // console.log(str);
                if(myresults.sound) audio.play();
              }
              $( "#leftdiv img" ).hide();
              $( "#leftdiv canvas" ).parent().parent().html("");
            }
            while ($( "#leftdiv div" ).length > 200){
              $( "#leftdiv div" ).first().remove(500);
            }
          });
        });
      });
    }
  }, false);
});

function regexEscape(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}
