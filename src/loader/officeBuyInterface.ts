const officeBuyInterfaceLoader = async () => {
  let officeWebsite: any;

  WA.room.onEnterLayer("Estrade").subscribe(async () => {
    officeWebsite = await WA.ui.website.open({
      url: "../pages/officeBuyInterface.html",
      position: {
        vertical: "top",
        horizontal: "right",
      },
      size: {
        height: "50vh",
        width: "30vw",
      },
      margin: {
        top: "10vh",
        right: "3vw",
      },
      allowApi: true,
    });
  });

  WA.room.onLeaveLayer("Estrade").subscribe(async () => {
    await officeWebsite.close();
  });
};
export const officeBuyInterface = officeBuyInterfaceLoader;
