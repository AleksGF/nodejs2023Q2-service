-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoritesToArtists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoritesToAlbums" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoritesToTracks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesToArtists_AB_unique" ON "_FavoritesToArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesToArtists_B_index" ON "_FavoritesToArtists"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesToAlbums_AB_unique" ON "_FavoritesToAlbums"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesToAlbums_B_index" ON "_FavoritesToAlbums"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesToTracks_AB_unique" ON "_FavoritesToTracks"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesToTracks_B_index" ON "_FavoritesToTracks"("B");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToArtists" ADD CONSTRAINT "_FavoritesToArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToArtists" ADD CONSTRAINT "_FavoritesToArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToAlbums" ADD CONSTRAINT "_FavoritesToAlbums_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToAlbums" ADD CONSTRAINT "_FavoritesToAlbums_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToTracks" ADD CONSTRAINT "_FavoritesToTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToTracks" ADD CONSTRAINT "_FavoritesToTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
