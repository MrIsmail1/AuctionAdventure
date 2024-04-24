const voteInterfaceLoader = async () => {
  let voteInterface: any;
  WA.player.state.foo = WA.player.name;

  const bidValue = document.getElementById("bid") as HTMLTextAreaElement;
  const bidButton = document.getElementById("bidSubmit") as HTMLButtonElement;

  bidButton.addEventListener("click", () => {
          console.log("Entering visibleNote layer");
        if (WA.state.bidValue ?? "" >= bidValue.value) {
            WA.chat.sendChatMessage("Une offre plus élevée existe déjà.", { scope: 'local', author: WA.player.state.master ?? 'System' });
        } else {
          WA.state.bidValue = bidValue.value;
          voteInterface = WA.ui.website.open({
              url: "../pages/voteInterface.html",
              position: {
                  vertical: "top",
                  horizontal: "middle",
              },
              size: {
                  height: "30vh",
                  width: "50vw",
              },
              margin: {
                  top: "10vh",
              },
              allowApi: true,
          });
        }
      });
};
export const voteInterface = voteInterfaceLoader;
