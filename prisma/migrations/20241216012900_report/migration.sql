-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER NOT NULL,
    "activityName" TEXT NOT NULL,
    "activityAuthor" TEXT NOT NULL,
    "reportText" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);
