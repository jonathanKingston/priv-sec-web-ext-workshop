# Glossary - Containers Workshop *by* [@KingstonTime](https://twitter.com/KingstonTime)

[< Back to the workshop](README.md)

## Glossary

<dl>
  <dt id="sdk">SDK</dt>
  <dd>
    SDK addons are the existing addon format that is soon to be removed from Firefox, these were very powerful but caused issues in updating Firefox.
  </dd>

  <dt id="web-extension">Web Extension</dt>
  <dd>The cross browser compatible extension format.</dd>

  <dt id="containers">Containers</dt>
  <dd>Containers are the interface the user has to control contextual identities.</dd>

  <dt id="cookie-store-id">cookieStoreId</dt>

  <dd>Is the name that is used for storage isolation in Web Extensions, the name comes from the <a href="https://developer.chrome.com/extensions/cookies#method-getAllCookieStores">Chrome extensions</a> and they use this for separating between normal and incognito mode.
In Firefox we use this for default, private mode and now <code>firefox-container-{container-id}</code></dd>

  <dt id="contextual-identities">Contextual Identities</dt>

  <dd>Consider that containers are the visual experience of how "Contextual Identities" are used within the platform. When you create a new Container, it is represented by a new contextual identity.</dd>

  <dt id="user-context-id">userContextId</dt>
  <dd>The underlying id that represents the Contextual Identity.</dd>

  <dt id="origin-attributes">Origin attributes</dt>
  <dd>
    Is the underlying technology used to isolate page loads within Firefox. <a href="https://en.wikipedia.org/wiki/Same-origin_policy">Same Origin Policy</a> is how security is normally considered across the web,
    it's easiest to consider all page loads secured by an object: <code>{protocol, hostname, port}</code> EG: <code>{http, example.com, 80}</code>.
    <br />
    <br />
    Origin attributes give the ability to isolate by another object:
    <br />
    <code>{protocol, hostname, port, originAttributes}</code> where originAttributes might be one of the following examples:
    <ul>
      <li><code>{userContextId: 0}</code> - Default browsing tab</li>
      <li><code>{privateBrowsingId: 1}</code> - Private browsing tab</li>
      <li><code>{userContextId: 12}</code> - Container 12</li>
    </ul>
    <br />
    So a Personal twitter tab might look like: <code>{https, twitter.com, 443, {userContextId: 1}}</code>
    <br />
    And a Work twitter tab might look like: <code>{https, twitter.com, 443, {userContextId: 2}}</code>
    <br />
    And a private twitter tab might look like: <code>{https, twitter.com, 443, {privateBrowsingId: 1}}</code>
    <br />
    All three tabs can't communicate or read from each others storages.
    <br />
    <br />
    This allows the browser to check that the originAttributes match the cookies and other storage before sending it to a website.
  </dd>
</dl>

[< Back to the workshop](README.md)
