-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "fullURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "parentUrlId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "extractedTitle" TEXT,
    "rawText" TEXT,
    "location" TEXT,
    "date" TEXT,
    "time" TEXT,
    "repeating" BOOLEAN NOT NULL,
    "additionalInfo" TEXT,
    "imageUrl" TEXT,
    "eventUrl" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_parentUrlId_fkey" FOREIGN KEY ("parentUrlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
