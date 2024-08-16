/*
  Warnings:

  - You are about to drop the `access_tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `app_accesses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `method_accesses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "access_tokens" DROP CONSTRAINT "access_tokens_app_id_fkey";

-- DropForeignKey
ALTER TABLE "app_accesses" DROP CONSTRAINT "app_accesses_app_id_fkey";

-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_app_id_fkey";

-- DropForeignKey
ALTER TABLE "method_accesses" DROP CONSTRAINT "method_accesses_app_id_fkey";

-- DropTable
DROP TABLE "access_tokens";

-- DropTable
DROP TABLE "app_accesses";

-- DropTable
DROP TABLE "applications";

-- DropTable
DROP TABLE "logs";

-- DropTable
DROP TABLE "method_accesses";

-- CreateTable
CREATE TABLE "log" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "http_code" INTEGER NOT NULL DEFAULT 200,
    "is_error" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);
