import * as webpackModules from '@goosemod/webpack';


export default {
  goosemodHandlers: {
    onImport: () => {
    let sep = {}, ms = {}, kb = {}, sub;
	function addFriendCount() {
    if (!sep) return;
    const o = ({}).onlineOnly;
    const num = o
      ? webpackModules.findByProps("getOnlineFriendCount").getOnlineFriendCount()
      : webpackModules.findByProps("getFriendIDs").getFriendIDs().length;

    let friendCount = document.getElementById("ed_friend_count");
    if (friendCount) {
      if (num === _num) return; // don't update if # is the same as before
      friendCount.innerHTML = num + (o ? " Online" : " Friends");
      _num = num;
      return;
    }
    const separator = document.querySelector(`.${sep.guildSeparator}`);
    if (separator) {
      friendCount = document.createElement("div");
      friendCount.className = `${ms ? ms.description + " " : ""}${
        sep.listItem
      } ${kb.keybind}`;
      friendCount.innerHTML = num + (o ? " Online" : " Friends");
      friendCount.id = "ed_friend_count";
      try {
        separator.parentElement.parentElement.insertBefore(
          friendCount,
          separator.parentElement
        );
        _num = num;
      } catch (err) {
        console.log(err);
      }
    }}
	 sep = webpackModules.findByProps("guildSeparator");
     ms = webpackModules.findByProps("modeSelectable");
     kb = webpackModules.findByProps("keybind");
     sub = webpackModules.findByProps("subscribe");

     sub.subscribe("CONNECTION_OPEN", addFriendCount());
     sub.subscribe("CONNECTION_RESUMED", addFriendCount());
     sub.subscribe("DISPATCH_APPLICATION_STATE_UPDATE", addFriendCount());
     sub.subscribe("PRESENCE_UPDATE", addFriendCount());
     sub.subscribe("RELATIONSHIP_ADD", addFriendCount());
     sub.subscribe("RELATIONSHIP_REMOVE", addFriendCount());

     addFriendCount();
      
    },
    onRemove: () => {
		const friendCount = document.getElementById("ed_friend_count");
    if (friendCount) friendCount.remove();

    sub.unsubscribe("CONNECTION_OPEN", addFriendCount());
    sub.unsubscribe("CONNECTION_RESUMED", addFriendCount());
    sub.unsubscribe("PRESENCE_UPDATE", addFriendCount());
    sub.unsubscribe("RELATIONSHIP_ADD", addFriendCount());
    sub.unsubscribe("RELATIONSHIP_REMOVE", addFriendCount());
	},
  },
};
