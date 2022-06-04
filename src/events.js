// Add the trackStart event so when a song will be played this message will be sent
player.on("trackStart", (queue, track) => {
  queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`)
});

// Add the error event
player.on("error", (queue, error) => {
  console.log(`Error: ${error.message}`)
});

// Add the connection error event 
player.on("connectionError", (queue, error) => {
  console.log(`Connection Error: ${error.message}`);
});

// Add the trackAdd event so when a song is being added, this message will be sent
player.on("trackAdd", (queue, track) => {
  queue.metadata.channel.send(`:white_check_mark: | **${track.title}** is being added to the queue`);
});

// Add a bot disconnect event
player.on("botDisconnect", (queue) => {
  queue.metadata.channel.send(`:hand_splayed: | Bot was disconnected. Clearing queue. Goodbye!`)
});

// Add the queue end event 
player.on('queueEnd', (queue) => {
  queue.metadata.channel.send(`:o: | No more songs in the queue.`);
});
