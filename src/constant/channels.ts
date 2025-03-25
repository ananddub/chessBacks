export enum MatchChannels {
    PROGRESS = 'match:progress',
    END = 'match:end',
    MATCH = 'match:match',
    REQUEST = 'match:request',
    ACCEPT = 'match:accept',
    MESSAGE = 'match:message',
    REJECT = 'match:reject',
    DISCONNECT = 'match:disconnect',
    DISCONNECT_REDIS = 'match:disconnect:redis',
    CONNECT = 'match:connect',
    CREATE = 'match:create',
    WATCH = 'match:watch',
    CUSTOM = 'match:custom',
    LEAVE = 'match:leave',
    USER = 'match:user',
    STATUS = 'match:status',
}

export enum TURN {
    WHITE = 'white',
    BLACK = 'black',
}

export enum KafkaEnum {
    socketName = 'kafka:',
}
