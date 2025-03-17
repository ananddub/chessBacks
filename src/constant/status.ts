export enum Status {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    PLAYING = 'playing',
    CANCELLED = 'cancelled',
    LOBBY = 'lobby',
    FINISHED = 'finished',
}

export enum MATCH {
    RESIGN = 'Resign',
    CHECKMATE = 'Checkmate',
    DRAW = 'Draw',
    OFFER_DRAW = 'Offer Draw',
    THREEFOLD_REPETITION_DRAW = 'Threefold Repetition Draw',
    STALEMATE_DRAW = 'Stalemate Draw',
    INSUFFICIENT_MATERIAL_DRAW = 'Insufficient Material Draw',
    ABANDONED = 'Abandoned',
    GAME_OVER = 'Game Over',
    IN_PROGRESS = 'In Progress',
    TIMEOUT = 'Timeout',
    PROMOTION = 'Promotion',
    CHECK = 'Check',
}

export enum MATCH_RATING {
    RESIGN = -20,
    CHECKMATE = 30,
    DRAW = 10,
    OFFER_DRAW = 5,
    THREEFOLD_REPETITION_DRAW = 5,
    STALEMATE_DRAW = 5,
    INSUFFICIENT_MATERIAL_DRAW = 5,
    ABANDONED = -10,
    GAME_OVER = 0,
    IN_PROGRESS = 0,
    TIMEOUT = -15,
    PROMOTION = 10,
    CHECK = 5,
}
