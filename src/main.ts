/// <reference types="@workadventure/iframe-api-typings" />
import { bidingInterface } from "./loader/bidingInterface";
import leaderboard from "./loader/leaderboard";
import { masterInterface } from "./loader/masterInterface";
import { signInterface } from "./loader/signInterface";
import { tutorialInterface } from "./loader/tutorialInterface";
import { voteInterface } from "./loader/voteInterface";

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { officeBuyInterface } from "./loader/officeBuyInterface";
import ticketOfficeInterface from "./loader/ticketOfficeInterface";

console.log("Script started successfully");

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    if (WA.room.hashParameters.master === "true") {
      WA.player.setOutlineColor(255, 0, 0);
      masterInterface();
      officeBuyInterface();
    } else {
      bidingInterface();
      tutorialInterface();
    }
    leaderboard();
    signInterface();
    ticketOfficeInterface();
  })
  .catch((e) => console.error(e));

export {};
