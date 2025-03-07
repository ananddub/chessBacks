-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('LOBBY', 'ACTIVE', 'IN_GAME', 'OFFLINE');

-- CreateEnum
CREATE TYPE "FriendshipStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'BLOCKED');

-- CreateTable
CREATE TABLE "Chess" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "groupName" TEXT NOT NULL DEFAULT '',
    "player1id" TEXT NOT NULL,
    "player2id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "requestedId" TEXT[],
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "startTimer" BIGINT NOT NULL DEFAULT 0,
    "p1starttime" BIGINT NOT NULL DEFAULT 0,
    "p2starttime" BIGINT NOT NULL DEFAULT 0,
    "p1endtime" BIGINT NOT NULL DEFAULT 0,
    "p2endtime" BIGINT NOT NULL DEFAULT 0,
    "endTimer" BIGINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalLive" INTEGER NOT NULL DEFAULT 0,
    "maxLive" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,

    CONSTRAINT "Chess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "chessId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Move" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "piece" TEXT NOT NULL,
    "movementId" TEXT,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movement" (
    "id" TEXT NOT NULL,
    "chessId" TEXT,

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "moveId" TEXT NOT NULL,
    "chessId" TEXT NOT NULL,
    "in_check" BOOLEAN NOT NULL,
    "in_checkmate" BOOLEAN NOT NULL,
    "in_draw" BOOLEAN NOT NULL,
    "in_stalemate" BOOLEAN NOT NULL,
    "in_threefold_repetition" BOOLEAN NOT NULL,
    "insufficient_material" BOOLEAN NOT NULL,
    "game_over" BOOLEAN NOT NULL,
    "fen" TEXT NOT NULL,
    "in_promotion" BOOLEAN NOT NULL,
    "userId" TEXT,
    "movementId" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'LOBBY',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" "FriendshipStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_requestedUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_requestedUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_removedUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_removedUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_acceptedUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_acceptedUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_rejectedUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_rejectedUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_watchingUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_watchingUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_likedUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_likedUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_dislikedUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_dislikedUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_requestedUsers_B_index" ON "_requestedUsers"("B");

-- CreateIndex
CREATE INDEX "_removedUsers_B_index" ON "_removedUsers"("B");

-- CreateIndex
CREATE INDEX "_acceptedUsers_B_index" ON "_acceptedUsers"("B");

-- CreateIndex
CREATE INDEX "_rejectedUsers_B_index" ON "_rejectedUsers"("B");

-- CreateIndex
CREATE INDEX "_watchingUsers_B_index" ON "_watchingUsers"("B");

-- CreateIndex
CREATE INDEX "_likedUsers_B_index" ON "_likedUsers"("B");

-- CreateIndex
CREATE INDEX "_dislikedUsers_B_index" ON "_dislikedUsers"("B");

-- AddForeignKey
ALTER TABLE "Chess" ADD CONSTRAINT "Chess_player1id_fkey" FOREIGN KEY ("player1id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chess" ADD CONSTRAINT "Chess_player2id_fkey" FOREIGN KEY ("player2id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chess" ADD CONSTRAINT "Chess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chessId_fkey" FOREIGN KEY ("chessId") REFERENCES "Chess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_chessId_fkey" FOREIGN KEY ("chessId") REFERENCES "Chess"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_requestedUsers" ADD CONSTRAINT "_requestedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Chess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_requestedUsers" ADD CONSTRAINT "_requestedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_removedUsers" ADD CONSTRAINT "_removedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Chess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_removedUsers" ADD CONSTRAINT "_removedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_acceptedUsers" ADD CONSTRAINT "_acceptedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Chess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_acceptedUsers" ADD CONSTRAINT "_acceptedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_rejectedUsers" ADD CONSTRAINT "_rejectedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Chess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_rejectedUsers" ADD CONSTRAINT "_rejectedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_watchingUsers" ADD CONSTRAINT "_watchingUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Chess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_watchingUsers" ADD CONSTRAINT "_watchingUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedUsers" ADD CONSTRAINT "_likedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Chess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedUsers" ADD CONSTRAINT "_likedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dislikedUsers" ADD CONSTRAINT "_dislikedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Chess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dislikedUsers" ADD CONSTRAINT "_dislikedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
