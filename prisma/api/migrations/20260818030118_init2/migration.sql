-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'UTILISATEUR');

-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'UTILISATEUR';
