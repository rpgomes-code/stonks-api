-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "app_slug" TEXT NOT NULL,
    "app_ip" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_accesses" (
    "id" TEXT NOT NULL,
    "app_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_accesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "method_accesses" (
    "id" TEXT NOT NULL,
    "app_id" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "method_accesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_tokens" (
    "id" TEXT NOT NULL,
    "app_id" TEXT NOT NULL,
    "Token" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "access_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "app_id" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "http_code" INTEGER NOT NULL,
    "is_error" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "applications_app_slug_key" ON "applications"("app_slug");

-- CreateIndex
CREATE UNIQUE INDEX "applications_app_ip_key" ON "applications"("app_ip");

-- AddForeignKey
ALTER TABLE "app_accesses" ADD CONSTRAINT "app_accesses_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "method_accesses" ADD CONSTRAINT "method_accesses_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_tokens" ADD CONSTRAINT "access_tokens_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
