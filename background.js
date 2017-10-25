chrome.storage.local.set({state: '1', sound: true, pm: true});

chrome.browserAction.onClicked.addListener(function (tab){
  chrome.storage.local.get('state', function(data) {
    if (data.state === '0') {
      chrome.storage.local.set({state: '1', sound: true, pm: true});
      chrome.browserAction.setBadgeText({text: ""});
      // chrome.tabs.return;
      chrome.browserAction.setIcon({ path:
        {
          "16": "/images/disable16.png",
          "24": "/images/disable24.png",
          "32": "/images/disable32.png"
        }
      });
      chrome.browserAction.setTitle({ title: 'Расширение отключено'});
      //do something, removing the script or whatever
    } else if (data.state === '1'){
      chrome.storage.local.set({state: '2', sound: false});
      // chrome.tabs.executeScript(null, { file: 'content.js' });
      chrome.browserAction.setBadgeText({text: "ON"});
      chrome.browserAction.setBadgeBackgroundColor({color: "#0066CD"});
      chrome.browserAction.setIcon({ path:
        {
          "16": "/images/icon16.png",
          "24": "/images/icon24.png",
          "32": "/images/icon32.png"
        }
      });
      chrome.browserAction.setTitle({ title: 'sociotime' });
    } else {
      chrome.storage.local.set({state: '0', pm: false});
      chrome.browserAction.setBadgeBackgroundColor({color: "#FF0000"});
      chrome.browserAction.setBadgeText({text: "🎵"});
    }
  });
});
