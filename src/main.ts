/// <reference types="@workadventure/iframe-api-typings" />
import { bidingInterface } from "./loader/bidingInterface";
import leaderboardInterface from "./loader/leaderboardInterface";
import { masterInterface } from "./loader/masterInterface";
import { voteInterface } from "./loader/voteInterface";

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { officeBuyInterface } from "./loader/officeBuyInterface";
import { signInterface } from "./loader/signInterface";
import ticketOfficeInterface from "./loader/ticketOfficeInterface";
import { tutorialInterface } from "./loader/tutorialInterface";

console.log("Script started successfully");

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    WA.state.saveVariable("showCar", false);
    if (WA.room.hashParameters.master === "true") {
      WA.player.setOutlineColor(255, 0, 0);
      officeBuyInterface();
    } else {
      bidingInterface();
      tutorialInterface();
    }
    if (WA.state.loadVariable("showCar")) {
      WA.room.showLayer("Car" + WA.state.productId);
    }
    leaderboardInterface();
    signInterface();
    ticketOfficeInterface();
  })
  .catch((e) => console.error(e));

export {};
