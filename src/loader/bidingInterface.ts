const bidingInterfaceLoader = async () => {
  let bindingInterface: any;

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
};
export const bidingInterface = bidingInterfaceLoader;
