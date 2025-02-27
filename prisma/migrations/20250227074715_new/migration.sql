/*
  Warnings:

  - Added the required column `gift_code` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "gift_code" TEXT NOT NULL;
