socket.onclose = function (event) {
    console.log(`as clean? ${event.wasClean} Code=${event.code} Reason=${ event.reason}`);
};