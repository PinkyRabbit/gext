chrome.browserAction.setBadgeText({text: "ON"});

/*

chrome.storage.local.get('state', function(data) {
  if(!data){
    chrome.storage.local.set({'state': 1}, function() {
      message('Settings saved');
    });
  }
});
chrome.storage.local.get('sound', function(data) {
  if(!data){
    chrome.storage.local.set({'sound': true}, function() {
      message('Settings saved');
    });
  }
});
chrome.storage.local.get('pm', function(data) {
  if(!data){
    chrome.storage.local.set({'pm': true}, function() {
      message('Settings saved');
    });
  }
});
*/


// chrome.storage.local.set({'state': 1, 'sound': true, 'pm': true, 'lastmsg': ''}, function() {
  chrome.browserAction.onClicked.addListener(function (tab){
    chrome.storage.local.get('state', function(data) {
      if (data.state === 0) {
        chrome.storage.local.set({'state': 1, 'pm': false }, function(datae){
          chrome.browserAction.setBadgeText({text: ""});
          // chrome.tabs.return;
          chrome.browserAction.setIcon({ path:
            {
              "16": "/images/disable16.png",
              "48": "/images/disable48.png",
              "128": "/images/disable128.png"
            }
          });
          chrome.browserAction.setTitle({ title: 'Расширение отключено'});
        });

        //do something, removing the script or whatever
      } else if (data.state === 1){
        chrome.storage.local.set({'state': 2, 'sound': true, 'pm': true}, function() {
          chrome.browserAction.setBadgeText({text: "ON"});
          chrome.browserAction.setBadgeBackgroundColor({color: "#0066CD"});
          chrome.browserAction.setIcon({ path:
            {
              "16": "/images/icon16.png",
              "48": "/images/icon48.png",
              "128": "/images/icon128.png"
            }
          });
          chrome.browserAction.setTitle({ title: 'sociotime' });
        });
        // chrome.tabs.executeScript(null, { file: 'content.js' });

      } else {
        chrome.storage.local.set({'state': 0, 'sound': false}, function() {
          chrome.browserAction.setBadgeBackgroundColor({color: "#000000"});
          chrome.browserAction.setBadgeText({text: "MUTE"});
        });
      }
    });
  });
