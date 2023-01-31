interface IReplyMessage {
  type: string;
  data: [string] | undefined;
}
type ICookie = chrome.cookies.Cookie;

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.text === "connected") {
    const replyMessage: IReplyMessage = { type: "getAllUsers", data: undefined };
    const cookies = await chrome.cookies.getAll({ url: "https://github.com" });
    const multiUserCookies = cookies.find((cookie) => cookie.name === "gh_multi_account_users");

    if (!multiUserCookies) {
      const currentUser = cookies.find((cookie) => cookie.name === "dotcom_user");

      if (currentUser) {
        await chrome.cookies.set({
          name: "gh_multi_account_users",
          url: "https://github.com",
          value: JSON.stringify({ [currentUser.value]: { cookies } }),
        });
        replyMessage.data = [currentUser.value];
      }
    } else {
      const cookies = JSON.parse(multiUserCookies.value);
      const usernames = cookies.filter((cookie: ICookie) => cookie.value === "dotcom_user");
      replyMessage.data = usernames.map((username: ICookie) => username.value);
    }
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.tabs.sendMessage(tab.id!, replyMessage);
  }
});
