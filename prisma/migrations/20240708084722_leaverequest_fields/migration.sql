/*
  Warnings:

  - You are about to drop the column `date` on the `LeaveRequest` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `LeaveRequest` table. All the data in the column will be lost.
  - Added the required column `Reason` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `To` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeaveRequest" DROP COLUMN "date",
DROP COLUMN "status",
ADD COLUMN     "From" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Reason" TEXT NOT NULL,
ADD COLUMN     "To" TIMESTAMP(3) NOT NULL;
