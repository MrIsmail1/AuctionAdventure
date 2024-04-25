const masterInterfaceLoader = async () => {
  let masterInterface: any;

  masterInterface = await WA.ui.website.open({
    url: "../pages/masterInterface.html",
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
export const masterInterface = masterInterfaceLoader;
