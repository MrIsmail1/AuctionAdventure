const ticketOfficeInterface = async () => {
  let ticket: any;

  WA.room.onEnterLayer("Guichet").subscribe(async () => {
    await WA.ui.modal.openModal({
      title: "WorkAdventure Tutorial",
      src: "http://localhost:5173/pages/ticketOfficeInterface.html",
      allow: "fullscreen",
      allowApi: true,
      position: "right",
    });
  });

  WA.room.onLeaveLayer("Guichet").subscribe(async () => {
    await WA.ui.modal.closeModal();
  });
};

export default ticketOfficeInterface;
