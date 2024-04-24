/// <reference types="@workadventure/iframe-api-typings" />
import { signInterface } from "./loader/signInterface";
import { bidingInterface } from "./loader/bidingInterface";

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log("Script started successfully");

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    bidingInterface();
    signInterface();
  })
  .catch((e) => console.error(e));

export {};
