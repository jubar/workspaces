/*
  Data structure stored in chrome local storage.

  timestamp: {
    name: 'My item',
    items: [
      { url: '', pinned: true, title: '', active: true, favIconUrl: '' },
      { url: '', pinned: true, title: '', active: true, favIconUrl: '' },
      { url: '', pinned: true, title: '', active: true, favIconUrl: '' }
    ],
    created: dateObject()
  },
  timestamp: {
    name: 'Another awesome item',
    items: [
      { url: '', pinned: true, title: '', active: true, favIconUrl: '' },
      { url: '', pinned: true, title: '', active: true, favIconUrl: '' },
      { url: '', pinned: false, title: '', active: true, favIconUrl: '' }
    ],
    created: dateObject()
  }
*/

function _mapLocalStorageItemsToWorkspaces(items) {
  let result = [];
  Object.keys(items).forEach((key) => {
    if (key !== 'settings') {
      result.push(items[key]);
    }
  });

  return result;
};

export default {
  getAllWorkspaces() {
    return new Promise((resolve) => {
      chrome.storage.local.get(null, resolve);
    }).then(_mapLocalStorageItemsToWorkspaces);
  },

  createFromCurrentWindow(name) {
    return new Promise((resolve) => {
      chrome.tabs.query({ currentWindow: true }, function(tabs) {
        let tabList = tabs.map(({ url, pinned, title, active, favIconUrl }) => {
          return {
            url,
            pinned,
            title,
            active,
            favIconUrl
          };
        });

        let workspace = {};
        let timestamp = new Date().getTime();

        workspace[timestamp] = {
          id: timestamp,
          name,
          created: timestamp,
          'items': tabList
        };

        chrome.storage.local.set(workspace, function() {
          resolve();
        });
      });
    });
  },

  deleteWorkspace(id) {
    return new Promise((resolve) => {
      chrome.storage.local.remove(id.toString());
      resolve();
    });
  },

  deleteAllWorkspaces() {
    return new Promise((resolve) => {
      chrome.storage.local.clear();
      resolve();
    });
  },

  openWorkspace(id, sameWindows) {
    return new Promise((resolve) => {
      chrome.storage.local.get(id.toString(), function(bucket) {
        console.log('Toy aca', bucket);
        if (sameWindows) {
          let workspace = bucket[id.toString()];

          chrome.tabs.query({}, function (tabs) {
            workspace.items.forEach((tab) => {
              chrome.tabs.create({
                windowId: chrome.windows.WINDOW_ID_CURRENT,
                url: tab.url,
                pinned: tab.pinned,
                active: tab.active
              });
            });

            for (var i = 0; i < tabs.length; i++) {
              chrome.tabs.remove(tabs[i].id);
            }
          });

          resolve();
        } else {
          chrome.windows.create(function(newWindow) {
            let isFirstTabLoad = false;
            let workspace = bucket[id.toString()];

            workspace.items.forEach((tab) => {
              chrome.tabs.create({
                windowId: newWindow.id,
                url: tab.url,
                pinned: tab.pinned,
                active: tab.active
              });

              if (!isFirstTabLoad) {
                // Remove default tab
                chrome.tabs.remove(newWindow.tabs[0].id);
                isFirstTabLoad = true;
              }
            });

            resolve();
          });
        }
      });
    });
  },

  getSetting(name) {
    return new Promise((resolve) => {
      chrome.storage.local.get('settings', function(result) {
        if (result.settings === undefined) {
          result.settings = {};
        }

        if (Object.keys(result.settings).includes(name)) {
          resolve(result.settings[name]);
        } else {
          resolve(null);
        }
      });
    });
  },

  saveSetting(name, value) {
    return new Promise((resolve) => {
      chrome.storage.local.get('settings', function(result) {
        if (!Object.keys(result).includes('settings')) {
          result['settings'] = {};
        }

        result.settings[name] = value;
        chrome.storage.local.set(result, function() {
          resolve();
        });
      });
    });
  }
};
