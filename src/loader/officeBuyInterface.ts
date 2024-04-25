const officeBuyInterfaceLoader = async () => {
    let officeWebsite: any;
  
    WA.room.onEnterLayer("furniture/officeBuy").subscribe(async () => {
      officeWebsite = await WA.ui.website.open({
          url: "../pages/officeBuyInterface.html",
          position: {
              vertical: "top",
              horizontal: "left",
          },
          size: {
              height: "70vh",
              width: "40vw",
          },
          margin: {
              top: "10vh",
          },
          allowApi: true,
      });
  
  });
  
  WA.room.onLeaveLayer("furniture/officeBuy").subscribe(async () => {
      await officeWebsite.close();
  });
  };
  export const officeBuyInterface = officeBuyInterfaceLoader;
  