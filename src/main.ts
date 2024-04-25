/// <reference types="@workadventure/iframe-api-typings" />
import { signInterface } from "./loader/signInterface";
import { bidingInterface } from "./loader/bidingInterface";
import leaderboard from "./loader/leaderboard";
import { voteInterface } from "./loader/voteInterface";

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import ticketOfficeInterface from "./loader/ticketOfficeInterface";
import { officeBuyInterface } from "./loader/officeBuyInterface";

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
