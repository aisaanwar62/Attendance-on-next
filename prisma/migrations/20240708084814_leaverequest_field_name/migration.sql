/*
  Warnings:

  - Added the required column `name` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeaveRequest" ADD COLUMN     "name" TEXT NOT NULL;
