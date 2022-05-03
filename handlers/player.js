const { createAudioPlayer} = require("@discordjs/voice");

const player = createAudioPlayer();

let queueConstructor = {
    songs: [],
    songNames: [],
    nowPlaying: "",
};

module.exports.player = player;
module.exports.queueConstructor = queueConstructor;
