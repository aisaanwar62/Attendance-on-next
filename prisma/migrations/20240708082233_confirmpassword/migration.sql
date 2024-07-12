/*
  Warnings:

  - You are about to drop the column `confirmPass` on the `User` table. All the data in the column will be lost.
  - Added the required column `confirmpassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "confirmPass",
ADD COLUMN     "confirmpassword" TEXT NOT NULL;
