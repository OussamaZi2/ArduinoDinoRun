//jshint esversion:6
var five = require("johnny-five");
var board = new five.Board(),
    servos = null,
    servoPins = [9, 10];

const
    io = require("socket.io"),
    server = io.listen(8000);

let
    sequenceNumberByClient = new Map();

// event fired every time a new client connects:
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    sequenceNumberByClient.set(socket, 1);

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });

    socket.on("Move", (msg) => {
        if (msg == "Jump") {
            console.log("Move sent from client : " + msg);
            Jump();
        } else {
            Duck();
        }
    });
});


board.on("ready", function () {
    initServo();
});

function initServo() {
    servos = new five.Servos(servoPins);
    servos[0].to(127);
    servos[1].to(15);
}

function Jump() {
    servos[0].to(135);
    setTimeout(() => {
        servos[0].to(127);
    }, 200);
}

function Duck() {
    servos[1].to(0);
    setTimeout(() => {
        servos[1].to(15);
    }, 200);
}