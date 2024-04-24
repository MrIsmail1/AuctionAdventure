const leaderboard = async () => {
let board: any;

  WA.room.onEnterLayer("leaderboard").subscribe(async () => {

        board = await WA.ui.website.open({
            url: "../pages/leaderboard.html",
            position: {
              vertical: "bottom",
              horizontal: "left",
            },
            size: {
              height: "30vh",
              width: "45vw",
            },
            margin: {
              top: "20vh",
              left: "3vh",
            },
            allowApi: true,
          });
        });

    WA.room.onLeaveLayer("leaderboard").subscribe(() => {
        board.close();
    });
}
export default leaderboard;
