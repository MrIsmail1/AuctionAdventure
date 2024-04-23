const bidingInterfaceLoader = async () => {
  let bindingInterface: any;

  bindingInterface = await WA.ui.website.open({
    url: "../pages/bidingInterface.html",
    position: {
      vertical: "top",
      horizontal: "right",
    },
    size: {
      height: "40vh",
      width: "20vw",
    },
    margin: {
      top: "10vh",
    },
    allowApi: true,
  });
};
export const bidingInterface = bidingInterfaceLoader;
