const ticketOfficeInterface = async () => {
  let ticket: any;

  WA.room.onEnterLayer("Guichet").subscribe(async () => {
    ticket = await WA.ui.website.open({
      url: "../pages/ticketOfficeInterface.html",
      position: {
        vertical: "top",
        horizontal: "middle",
      },
      size: {
        height: "43vh",
        width: "80vw",
      },
      margin: {
        top: "10vh",
      },
      allowApi: true,
    });
  });

  WA.room.onLeaveLayer("Guichet").subscribe(async () => {
    await ticket.close();
  });
};

export default ticketOfficeInterface;
