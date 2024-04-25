const bidingInterfaceLoader = async () => {
  let bindingInterface: any;
  WA.room.area.onEnter("auctionZone").subscribe(async () => {
    bindingInterface = await WA.ui.website.open({
      url: "../pages/bidingInterface.html",
      position: {
        vertical: "top",
        horizontal: "right",
      },
      size: {
        height: "80vh",
        width: "26vw",
      },
      margin: {
        top: "10vh",
      },
      allowApi: true,
    });
  });
  const bidValue = document.getElementById("bid") as HTMLTextAreaElement;
  const bidButton = document.getElementById("bidSubmit") as HTMLButtonElement;

  bidButton.addEventListener("click", () => {});
  WA.room.area.onLeave("auctionZone").subscribe(() => {
    if (bindingInterface) {
      bindingInterface.close();
    }
  });
};
export const bidingInterface = bidingInterfaceLoader;
