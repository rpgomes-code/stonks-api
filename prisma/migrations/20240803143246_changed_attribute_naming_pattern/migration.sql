/*
  Warnings:

  - You are about to drop the column `Token` on the `access_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `access_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `access_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `access_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `app_accesses` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `app_accesses` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `app_accesses` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `method_accesses` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `method_accesses` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `method_accesses` table. All the data in the column will be lost.
  - Added the required column `expires_at` to the `access_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `access_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `access_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `app_accesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `app_accesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `method_accesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `method_accesses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "access_tokens" DROP COLUMN "Token",
DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "app_accesses" DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "logs" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "http_code" SET DEFAULT 200,
ALTER COLUMN "is_error" SET DEFAULT false;

-- AlterTable
ALTER TABLE "method_accesses" DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
