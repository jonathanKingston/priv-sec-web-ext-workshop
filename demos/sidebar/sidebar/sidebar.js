console.log("hey");

function renderContainer(identity) {
  const {name, cookieStoreId, color} = identity; 
  const template = escaped`
    <span class="label" style="color: ${color};">
      ${name}
    </span>
    <button>Open tab</button>
  `;
  const div = document.createElement("div");
  div.className = "row";
  div.innerHTML = template;
  div.querySelector("button").addEventListener("click", (e) => {
    console.log("clicked", identity, e.target);
    browser.tabs.create({cookieStoreId, url: "about:home"});
  });
  document.body.appendChild(div);
}

browser.contextualIdentities.query({}).then((identities) => {
console.log("identities", {identities});
  identities.forEach((identity) => {
    renderContainer(identity);
  });
});



/**
 * Escapes any occurances of &, ", <, > or / with XML entities.
 *
 * @param {string} str
 *        The string to escape.
 * @return {string} The escaped string.
 */
function escapeXML(str) {
  const replacements = {"&": "&amp;", "\"": "&quot;", "'": "&apos;", "<": "&lt;", ">": "&gt;", "/": "&#x2F;"};
  return String(str).replace(/[&"'<>/]/g, m => replacements[m]);
}

/**
 * A tagged template function which escapes any XML metacharacters in
 * interpolated values.
 *
 * @param {Array<string>} strings
 *        An array of literal strings extracted from the templates.
 * @param {Array} values
 *        An array of interpolated values extracted from the template.
 * @returns {string}
 *        The result of the escaped values interpolated with the literal
 *        strings.
 */
function escaped(strings, ...values) {
  const result = [];

  for (const [i, string] of strings.entries()) {
    result.push(string);
    if (i < values.length)
      result.push(escapeXML(values[i]));
  }

  return result.join("");
}
