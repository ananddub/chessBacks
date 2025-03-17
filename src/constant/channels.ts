export enum Channels {
    ON_PROGRESS = 'on_Progress',
    ON_END_MATCH = 'on_endMatch',
    ON_MATCH = 'on_Match',
    ON_REQUEST_JOIN = 'on_requestJoin',
    ON_ACCEPT_JOIN = 'on_acceptJoin',
    ON_MESSAGE = 'on_message',
    ON_REJECT_JOIN = 'on_rejectJoin',
    ON_DISCONNECT = 'disconnect',
    RON_DISCONNECT = 'on_disconnect_redis',
    ON_CONNECT = 'on_connects',
    ON_CREATE = 'on_create',
    ON_WATCH = 'on_watch',
    ON_CUSTOM_CHALLENGE = 'on_custom_challenge',
    ON_LEAVE = 'on_leave',
    ON_CREATE_USER = 'on_create_user',
    ON_USER_STATUS = 'on_user_status',
}

export enum TURN {
    WHITE = 'white',
    BLACK = 'black',
}

export enum KafkaEnum {
    socketName = 'kafka_',
}
