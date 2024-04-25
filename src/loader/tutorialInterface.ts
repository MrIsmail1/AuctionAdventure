const tutorialInterfaceLoader = async () => {
  WA.onInit().then(() => {
    WA.room.area.onEnter("tutorialZone").subscribe(() => {
      WA.ui.modal.openModal({
        title: "WorkAdventure Tutorial",
        src: "http://localhost:5173/pages/tutorialInterface.html",
        allow: "fullscreen",
        allowApi: true,
        position: "right",
      });
    });
    WA.room.area.onLeave("tutorialZone").subscribe(() => {
      WA.ui.modal.closeModal();
    });
  });
};

export const tutorialInterface = tutorialInterfaceLoader;
