/*
  Warnings:

  - You are about to drop the column `skillsDescription` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `skillsTitle` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `skillsType` on the `skills` table. All the data in the column will be lost.
  - Added the required column `skillTitle` to the `skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillType` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "skills" DROP COLUMN "skillsDescription",
DROP COLUMN "skillsTitle",
DROP COLUMN "skillsType",
ADD COLUMN     "skillDescription" VARCHAR(250),
ADD COLUMN     "skillTitle" VARCHAR(100) NOT NULL,
ADD COLUMN     "skillType" VARCHAR(100) NOT NULL;
