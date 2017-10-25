$(document).ready(function() {
  alert('ready!');
  var audio = new Audio('http://princezze.free.fr/sounds/Opbeep.wav');
  var str = '';
  audio.loop = false;
  $('#leftdiv').bind('DOMNodeInserted', function(event) {
    $( "#leftdiv div" ).last().hide().show(800);
    str = $( "#leftdiv div" ).last().text();
    if(/камыш/ig.test(str)){
      if(!$('#myownlog').length){
        $( "#privatdiv" ).after( '<div id="myownlog"></div>' );
      }
      $('#myownlog').append('<div class="js-killlog" style="border: 1px solid #ffffff;font-size: 1.5em;background: #4f6171;color: #ffffff;padding: 2px 10px;cursor: pointer;">'+str+'</div>');
      $('#myownlog div').last().hide().show(200);
      $('.js-killlog').on('click', function(e) {
        $(this).hide(500);
      });
      // console.log(str);
      let gettingItem = chrome.storage.local.get(['sound', 'pm']);
      alert(JSON.stringify(gettingItem.then(onGot, onError)));
      audio.play();
    }
    while ($( "#leftdiv div" ).length > 200){
      $( "#leftdiv div" ).first().remove(500);
    }
    $( "#leftdiv img" ).hide();
    $( "#leftdiv canvas" ).parent().parent().html("");
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        var firstHref = $("a[href^='http']").eq(0).attr("href");

        console.log(firstHref);

        // This line is new!
        chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
      }
    }
  );
});
