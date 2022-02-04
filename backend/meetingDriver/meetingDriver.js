const { Server } = require("socket.io");
const middleware = require('socketio-wildcard')();

const utils = require('../utils/utils')
const { SOCKET_EVENTS, TIMER_DURATIONS, MAX_MEMBERS_PER_MEETING } = require("./constants");

class MeetingDriver {
    // Set the bindings for different APIs
    FUNCTION_BINDINGS = {
        // Participant
        [SOCKET_EVENTS.JOIN_MEETING]: this.joinMeeting.bind(this),
        [SOCKET_EVENTS.LEAVE_MEETING]: this.leaveMeeting.bind(this),
        [SOCKET_EVENTS.MUTE]: this.mute.bind(this),
        [SOCKET_EVENTS.UNMUTE]: this.unmute.bind(this),

        // Host
        [SOCKET_EVENTS.CREATE_MEETING]: this.createMeeting.bind(this),
        [SOCKET_EVENTS.SET_TIMER]: this.setTimer.bind(this),
        [SOCKET_EVENTS.MUTE_ALL]: this.muteAll.bind(this),
        [SOCKET_EVENTS.END_MEETING]: this.endMeeting.bind(this),
    }

    constructor(server) {
        // This holds data about the meetings
        this.meetingData = {}

        this.io = new Server(server, {
            cors: {
                origin: "*",
                credentials: true
            }
        });
        this.io.use(middleware)

        this.io.on(SOCKET_EVENTS.CONNECTION, this.connect.bind(this));
    }

    connect(socket) {
        socket.on('*', this.receiveData.bind(this, socket))
    }

    receiveData(socket, data) {
        const api = data.data[0]

        console.log(api, data.data[1], socket.id)

        this.FUNCTION_BINDINGS[api](
            socket,
            data.data[1],
        )
    }

    updateMeeting(meetingId) {
        this.io.to(meetingId).emit(SOCKET_EVENTS.MEETING_UPDATE, this.meetingData[meetingId])
    }

    // Participant
    joinMeeting(socket, { meetingId, participantDetails }) {
        // Check if the meeting exists
        if (this.meetingData[meetingId] && Object.keys(this.meetingData[meetingId]).length < MAX_MEMBERS_PER_MEETING) {

            // Persist the details about the participant in the meeting data
            this.meetingData[meetingId][socket.id] = {
                name: participantDetails.name,
                isHost: false,
                muted: false,
            }

            // Join the meeting room
            socket.join(meetingId)

            this.updateMeeting(meetingId)
        }
    }

    leaveMeeting(socket, { meetingId }) {
        // Check if the meeting exists
        if (this.meetingData[meetingId]) {
            // Leave the meeting room
            socket.leave(meetingId)

            // Remove the details about the socket
            this.meetingData[meetingId][socket.id] = undefined

            this.updateMeeting(meetingId)
        }
    }

    mute(socket, { meetingId }) {
        // Check if the meeting exists
        if (this.meetingData[meetingId]) {
            this.meetingData[meetingId][socket.id].muted = true
        }

        // Update the meeting
        this.updateMeeting(meetingId)
    }

    unmute(socket, { meetingId }) {
        // Check if the meeting exists
        if (this.meetingData[meetingId]) {
            this.meetingData[meetingId][socket.id].muted = false
        }

        // Update the meeting
        this.updateMeeting(meetingId)
    }

    // Host
    createMeeting(socket, { hostDetails }) {
        // Create the meeting ID
        const meetingId = utils.getUUID()

        // Create an meeting with just the host
        this.meetingData[meetingId] = {
            [socket.id]: {
                name: hostDetails.name,
                isHost: true,
                muted: false
            }
        }

        // Join the meeting room
        socket.join(meetingId)

        // Reply to the client that the meeting is created
        socket.emit(SOCKET_EVENTS.MEETING_CREATED, { meetingId })
    }

    setTimer(socket, { meetingId, timerKey }) {
        // Check if the meeting exists
        if (this.meetingData[meetingId]) {

            // Check if the socket is of the host
            if (this.meetingData[meetingId][socket.id] &&
                this.meetingData[meetingId][socket.id].isHost) {

                // Send the data to all the participants
                this.io.to(meetingId).emit(
                    SOCKET_EVENTS.TIMER_SET,
                    // Instead of taking the time in seconds from the client, using the key ensures
                    // clients cannot send any value of time, and have to choose one of the predefined values
                    {duration: Object.values(TIMER_DURATIONS).find(timer => timer.key === timerKey).duration},
                )
            }
        }
    }

    muteAll(socket, { meetingId }) {
        // Check if the meeting exists
        if (this.meetingData[meetingId]) {

            // Check if the socket is of the host
            if (this.meetingData[meetingId][socket.id] &&
                this.meetingData[meetingId][socket.id].isHost) {

                // Mute all the participants
                Object.keys(this.meetingData[meetingId]).forEach(socketId => {
                    this.meetingData[meetingId][socketId].muted = true
                })

                this.updateMeeting(meetingId)
            }
        }
    }

    endMeeting(socket, { meetingId }) {
        // Check if the meeting exists
        if (this.meetingData[meetingId]) {

            // Check if the socket is of the host
            if (this.meetingData[meetingId][socket.id] &&
                this.meetingData[meetingId][socket.id].isHost) {

                // Send the data to all the participants
                this.io.to(meetingId).emit(SOCKET_EVENTS.END_MEETING)
            }
        }
    }
}

meetingDriver = null

function getInstance() {
    return meetingDriver
}

function initialize(server) {
    meetingDriver = new MeetingDriver(server)
}

module.exports = {
    getInstance,
    initialize
}