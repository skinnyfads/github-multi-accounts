sendConnectedMessage();
appendSwitchAccountModal();

const includeFragmentMenuElement = document.querySelector("include-fragment[src$='/menu']")!;

includeFragmentMenuElement.addEventListener("load", () => {
  const settingsButtonElement = document.querySelector("details-menu.dropdown-menu a[href='/settings/profile']");
  const switchAccountButtonElement = document.createElement("div");

  switchAccountButtonElement.innerHTML = `<button class="dropdown-item btn-link" role="menuitem">Switch Account</button>`;
  settingsButtonElement?.parentNode?.insertBefore(switchAccountButtonElement, settingsButtonElement.nextSibling);

  switchAccountButtonElement.onclick = () => {
    const switchAccountModalElement = document.querySelector("#switch-account-modal")!;
    switchAccountModalElement.setAttribute("open", "");
  };
});
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "getAllUsers") {
    listAllUsers(message.data);
  }
});
function listAllUsers(usernames: string[]) {
  const divElement = document.querySelector("#switch-account-modal-account-list");
  if (!divElement) return;

  usernames.forEach((username) => {
    divElement.innerHTML += `
    <a 
    class="d-block Box-row Box-row--hover-gray mt-0 color-fg-default no-underline" 
    href="${location.href}"
    data-account-username="${username}"
    >
      <h4>${username}</h4>
    </a>
    `;
  });
  const usernameElements = document.querySelectorAll("#switch-account-modal-account-list a[href]");

  usernameElements.forEach((usernameElement) => {
    usernameElement.addEventListener("click", () => {
      console.log(usernameElement.getAttribute("data-account-username"));
    });
  });
}
function sendConnectedMessage() {
  chrome.runtime.sendMessage("Connected!");
}
function appendSwitchAccountModal() {
  const bodyElement = document.querySelector("body")!;

  bodyElement.innerHTML += `
  <details class="details-reset details-overlay details-overlay-dark lh-default color-fg-default hx_rsm" id="switch-account-modal">
    <summary role="button" aria-label="Close dialog">
      ::before
    </summary>
    <details-dialog class="Box Box--overlay d-flex flex-column anim-fade-in fast hx_rsm-dialog hx_rsm-modal" role="dialog" aria-modal="true" tabindex="-1">
      <div id="switch-account-modal-account-list">
        <a class="d-block Box-row Box-row--hover-gray mt-0 color-fg-default no-underline">
          <h4>Switch Account</h4>
        </a>
      </div>
      <button class="Box-btn-octicon m-0 btn-octicon position-absolute right-0 top-0" type="button" aria-label="Close dialog" data-close-dialog="">
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
          <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
        </svg>
      </button>
    </details-dialog>
  </details>
`;
}
