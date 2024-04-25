

const ticketOfficeInterface = async () => {
  let ticket: any;

  WA.room.onEnterLayer("hamza").subscribe(async () => {

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

  WA.room.onLeaveLayer("hamza").subscribe(async () => {
    await ticket.close();
  });
};

export default ticketOfficeInterface;
