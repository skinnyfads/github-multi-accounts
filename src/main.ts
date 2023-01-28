const includeFragmentMenuElement = document.querySelector("include-fragment[src$='/menu']")!;

includeFragmentMenuElement.addEventListener("load", () => {
  const settingsButtonElement = document.querySelector("details-menu.dropdown-menu a[href='/settings/profile']");
  const switchAccountButtonElement = document.createElement("div");

  switchAccountButtonElement.innerHTML = `<button class="dropdown-item btn-link" role="menuitem">Switch Account</button>`;
  settingsButtonElement?.parentNode?.insertBefore(switchAccountButtonElement, settingsButtonElement.nextSibling);
});
