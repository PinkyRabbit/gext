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
      if(!$('#myownlog').length) $( "#privatdiv" ).after( '<div id="myownlog"></div>' );
      var audio = new Audio('http://princezze.free.fr/sounds/Opbeep.wav');
      var str = '';
      var html = '';
      var oldhtml = '';
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
        if(src !== '/img/') $(this).addClass("img-responsive").wrap( "<span style='max-width:"+maxwidth+"px;max-height:"+maxhei+"px'></span>" );
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

          chrome.storage.local.get(null, function (myresults) {
            //pick next line
            var current = $( "#leftdiv div" ).last();

            html = current.html();
            // console.log(current);
            if(html!==myresults.lastmsg){

              //remove br
              current.html(function(){
                return $(this).html().replace(/<br>/g," ").replace(/\s{2,}/g," ");
              });

              // wrap image
              if(/<img/g.test(html)){
                current.children().find("img").each(function() {
                  var src = $(this).attr("src").substring(0, 5);
                  var src2 = $(this).attr("src").substring(0, 15);
                  if(src !== '/img/' && src2 !=='img/statusIcons' && !$(this).hasClass( "img-responsive" )) $(this).addClass("img-responsive").wrap( "<span style='max-width:"+maxwidth+"px;max-height:"+maxhei+"px'></span>" );
                })
              }

              oldhtml = current.html();
              // if we hide images
              if(myresults.logNimg && /<img/g.test(html)){
                current.children().find('img').each(function( index ) {
                  var urlimg = $(this).attr('src');
                  var src = urlimg.substring(0, 5);
                  var src2 = urlimg.substring(0, 15);
                  if(src !== '/img/' && src2 !=='img/statusIcons'){
                    $(this).replaceWith('<span class="ext-showimg" data-extimg='+urlimg+'><span class="glyphicon glyphicon-picture" aria-hidden="true"></span> Показать изображение</span>');
                  }
                });
                current.children().find('.ext-showimg').each(function( index ) {
                  $(this).on('click', function() {
                    var urlimg = $(this).data('extimg');
                    $(this).replaceWith('<span style="max-width:'+maxwidth+'px;max-height:'+maxhei+'px"><img src="'+urlimg+'" border="0" class="img-responsive"></span>');
                  });
                });
              }

              html = current.html();
              chrome.storage.local.set({'lastmsg': html}, function() {

                // test text on nick
                str = current.text();
                var regex = new RegExp(myresults.name, "gi");
                if(regex.test(str)){

                  // if we have sound
                  if(myresults.sound) audio.play();

                  // if we have log
                  console.log(myresults.logNimg);
                  if(myresults.logNimg){
                    oldhtml = oldhtml.replace(/<font.*?>/gi," ").replace(/\s{2,}/g," ");
                    $('#myownlog').append('<div class="js-killlog">'+oldhtml+'</div>');
                    $('#myownlog div').last().hide().show(200);
                    $('.js-killlog').on('click', function(e) {
                      $(this).hide(500);
                      var that = this;
                      setTimeout(function(){that.remove()}, 500);
                    });
                  }
                }
                console.log(JSON.stringify(myresults));
              });

            }else console.log('Одинаковое!!');
            // DEBUG LOG
            // console.log(JSON.stringify(myresults));
          });


          /*
          FOR MUTATION DEBUG

          mutations.forEach(function(mutation) {
            console.log(mutation.type);
          });
          */
        });

        observer.observe(target, {childList: true});

        // позже можно остановить наблюдение
        // observer.disconnect();

      });
    }
  }, false);
});

function regexEscape(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}
