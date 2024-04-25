/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Vote Script started successfully');

WA.onInit().then(() => {
     WA.players.configureTracking();
    const players = WA.players.list();
    for (const play of players) {
        play.outlineColor;
    }
    let author: string = WA.player.name;
    WA.chat.sendChatMessage(author + ' a émis une nouvelle enchère à '+ WA.state.bidValue, { scope: 'local', author: WA.player.state.master ?? 'System' });
    WA.player.setOutlineColor(255, 0, 0);
}).catch(e => console.error(e));

export {};