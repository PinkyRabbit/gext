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

      // basic settings
      var audio = new Audio('http://princezze.free.fr/sounds/Opbeep.wav');
      var str = '';
      var html = '';
      var maxwidth = $('#leftdiv').outerWidth();
      var maxhei = $('#main_box').outerHeight()/3;
      $('#leftdiv').on('resize', function() {
        maxwidth = $('#leftdiv').outerWidth();
        maxhei = $('#main_box').outerHeight()/3;
      })
      audio.loop = false;

      // fix images before start
      $( "#leftdiv div" ).children().find("img").each(function() {
        var src = $(this).attr("src").substring(0, 5);
        if(src !== '/img/') $(this).addClass("img-responsive").wrap( "<span style='max-width:"+maxwidth+"px;max-height="+maxhei+"px'></span>" );
      })
      $( "#leftdiv div" ).html(function(){
        return $(this).html().replace(/<br>/g," ");
      });

      // save last html
      var html = $( "#leftdiv div" ).last().html();

      var myNameIs = regexEscape(event.data.text);
      chrome.storage.local.set({'name': myNameIs, 'lastmsg': html}, function() {
        // remove injection
        $('#killmeplz').remove();

        // выбираем целевой элемент
        var target = document.getElementById('leftdiv');
        // console.log(document.getElementById('leftdiv').innerHTML.substring(0,200));

        // создаём экземпляр MutationObserver
        var observer = new MutationObserver(function(mutations) {
          var current = $( "#leftdiv div" ).last();
          console.log(current);
          mutations.forEach(function(mutation) {
            console.log(mutation.type);
          });
        });

        // конфигурация нашего observer:
        var config = {
          childList: true
        };

        // передаём в качестве аргументов целевой элемент и его конфигурацию
        observer.observe(target, config);

        // позже можно остановить наблюдение
        // observer.disconnect();


        // start messages cycle
        /*
        $('#leftdiv').on('DOMNodeInserted', function(event) {
          chrome.storage.local.get(null, function (myresults) {
            //pick next line
            var current = $( "#leftdiv div" ).last();

            html = current.html();

            if(html!==myresults.lastmsg){
              current.html(function(){
                return $(this).html().replace(/<br>/g," ").replace(/\s{2,}/g," ");
              });
              chrome.storage.local.set({'lastmsg': html}, function() {

                console.log(JSON.stringify(myresults));
              });

            }else console.log('Одинаковое!!');

            // DEBUG LOG
            // console.log(JSON.stringify(myresults));
        });});
        */
      });
    }
  }, false);
});
/*


        $('#leftdiv').bind('DOMNodeInserted', function(event) {
          chrome.storage.local.get(null, function (myresults) {

            alert(JSON.stringify(myresults));
            alert('STATE '+myresults.state);
            if(myresults.pm) alert('ON ALL');
            if(myresults.sound) alert('ON SOUND');

            // $( "#leftdiv div" ).last().hide().show(800);

            // save new string
            var current = $( "#leftdiv div" ).last();

            // remove br
            current.html(function(){
              return $(this).html().replace(/<br>/g," ");
            });

            // wrap image
            if(/<img/g.test(html)){
              current.children().find("img").each(function() {
                var src = $(this).attr("src").substring(0, 5);
                if(src !== '/img/' && !$(this).hasClass( "img-responsive" )) $(this).addClass("img-responsive").wrap( "<span style='max-width:"+maxwidth+"px;max-height="+maxhei+"px'></span>" );
              })
            }

            html = current.html();

            //protection from doubles
            if(myresults.lastmsg!=html)
              chrome.storage.local.set({'lastmsg': html}, function() {
                console.log(myresults.lastmsg+"\n=============="+html);
                // slow shows last message


                /*


                // create one more block if hasnt
                if(!$('#myownlog').length) $( "#privatdiv" ).after( '<div id="myownlog"></div>' );
                // test text and save if needed
                str = current.text();
                var regex = new RegExp(myresults.name, "gi");
                if(regex.test(str)){
                  $('#myownlog').append('<div class="js-killlog">'+str+'</div>');
                  $('#myownlog div').last().hide().show(200);
                  $('.js-killlog').on('click', function(e) {
                    $(this).hide(500);
                  });
                  // console.log(str);
                  audio.play();

                }

              });

            if(myresults.pm){

              if(myresults.sound){
                str = $( "#leftdiv div" ).last().text();
                var regex = new RegExp(myresults.name, "gi");
                if(regex.test(str)){
                  $('#myownlog').append('<div class="js-killlog">'+str+'</div>');
                  $('#myownlog div').last().hide().show(200);
                  $('.js-killlog').on('click', function(e) {
                    $(this).hide(500);
                  });
                  // console.log(str);
                  audio.play();
                }
              }
              //hide images
              if(/<img/.test(html)){
                // alert(current.children('img'));
                current.children('img').replaceWith(function(){
                  var urlimg = $(this).attr('src');
                  return '<span class="ext-showimg" data='+urlimg+'>🖼 Показать изображение</span>';
                });
              }

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
*/
function regexEscape(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}
