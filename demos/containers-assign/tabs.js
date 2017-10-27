const assignManager = {
  personalId: null,

  init() {
    /* Set of containers that look like personal containers */
    const personalish = new Set([
      "personal",
      "social",
      "friends"
    ]);

    const personalPages = new Set([
      "facebook.com",
      "twitter.com"
    ]);

    /* lets lookup containers we have and remember a personal container we have */
    browser.contextualIdentities.query({}).then((identities) => {
      identities.forEach((identity) => {
        if (personalish.has(identity.name.toLowerCase())) {
          this.personalId = identity.cookieStoreId;
        }
      });
    });

    // Before a request is handled by the browser we decide if we should route through a different container
    browser.webRequest.onBeforeRequest.addListener((options) => {
      if (options.frameId !== 0 || options.tabId === -1) {
        return {};
      }
      const pageUrl = new URL(options.url);
      if (!personalPages.has(pageUrl.hostname)) {
        return;
      }
      return browser.tabs.get(options.tabId).then((tab) => {
        if (tab.cookieStoreId === this.personalId
            || tab.incognito) {
          return {};
        }

        this.reloadPageInContainer(options.url, this.personalId, tab.index + 1);
        browser.tabs.remove(tab.id);

        return {
          cancel: true,
        };
      }).catch((e) => {
        throw e;
      });
    },{urls: ["<all_urls>"], types: ["main_frame"]}, ["blocking"]);
  },

  reloadPageInContainer(url, cookieStoreId, index) {
    browser.tabs.create({url, cookieStoreId, index});
  }
};

assignManager.init();
