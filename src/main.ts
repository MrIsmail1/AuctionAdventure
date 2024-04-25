/// <reference types="@workadventure/iframe-api-typings" />
import { bidingInterface } from "./loader/bidingInterface";
import leaderboard from "./loader/leaderboard";
import { masterInterface } from "./loader/masterInterface";
import { signInterface } from "./loader/signInterface";
import { voteInterface } from "./loader/voteInterface";

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { officeBuyInterface } from "./loader/officeBuyInterface";
import ticketOfficeInterface from "./loader/ticketOfficeInterface";

console.log("Script started successfully");

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    /* bidingInterface(); */
    leaderboard();
    signInterface();
    ticketOfficeInterface();
    voteInterface();
    officeBuyInterface();
  })
  .catch((e) => console.error(e));

export {};
