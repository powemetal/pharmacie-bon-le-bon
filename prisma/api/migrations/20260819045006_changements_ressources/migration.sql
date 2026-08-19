/*
  Warnings:

  - You are about to drop the column `contenu` on the `RessourceSante` table. All the data in the column will be lost.
  - Added the required column `description` to the `RessourceSante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `RessourceSante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RessourceSante" DROP COLUMN "contenu",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
