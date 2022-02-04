const TIMER_DURATIONS = {
    SECONDS_15: {key: 'seconds_15', duration: 15},
    SECONDS_30: {key: 'seconds_30', duration: 30},
    SECONDS_45: {key: 'seconds_45', duration: 45},
}

const SOCKET_EVENTS = {
    // Common
    CONNECTION: 'connection',
    MEETING_UPDATE: 'meeting_update',
    

    // Requests
    // Participant
    JOIN_MEETING: 'join_meeting',
    LEAVE_MEETING: 'leave_meeting',
    MUTE: 'mute',
    UNMUTE: 'unmute',
    
    // Host
    CREATE_MEETING: 'create_meeting',
    END_MEETING: 'end_meeting',
    SET_TIMER: 'set_timer',
    MUTE_ALL: 'mute_all',


    // Responses
    // Participant
    TIMER_SET: 'timer_set',
    
    // Host
    MEETING_CREATED: 'meeting_created',
}

const MAX_MEMBERS_PER_MEETING = 5

module.exports = {
    TIMER_DURATIONS,
    SOCKET_EVENTS,
    MAX_MEMBERS_PER_MEETING
}