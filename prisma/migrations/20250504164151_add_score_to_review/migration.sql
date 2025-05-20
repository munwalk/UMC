/*
  Warnings:

  - Added the required column `score` to the `user_store_review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_store_review` ADD COLUMN `score` INTEGER NOT NULL;
