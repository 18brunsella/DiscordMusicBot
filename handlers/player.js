// Discord Voice API (retrieves the createAudioPlayer)
const { createAudioPlayer, NoSubscriberBehavior} = require("@discordjs/voice");

// Creates the audio player 
const player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Play
    }
});

// Creates the song queue 
let songQueue = {
    songURL: [],
    songName: [],
    songDuration: [],
    nowPlaying: "",
};

// Exports these default values 
module.exports.player = player;
module.exports.songQueue = songQueue;
