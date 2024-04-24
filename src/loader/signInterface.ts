const signInterfaceLoader = async () => {
  let noteWebsite: any;

  WA.room.onEnterLayer("furniture/sign").subscribe(async () => {
    console.log("Entering visibleNote layer");

    noteWebsite = await WA.ui.website.open({
        url: "../pages/signInterface.html",
        position: {
            vertical: "top",
            horizontal: "middle",
        },
        size: {
            height: "30vh",
            width: "50vw",
        },
        margin: {
            top: "10vh",
        },
        allowApi: true,
    });

});

WA.room.onLeaveLayer("furniture/sign").subscribe(async () => {
    await noteWebsite.close();
});
};
export const signInterface = signInterfaceLoader;
