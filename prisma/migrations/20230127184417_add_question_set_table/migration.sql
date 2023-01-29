-- CreateTable
CREATE TABLE `QuestionSet` (
    `id` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,
    `dates` VARCHAR(191) NOT NULL,
    `budget` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QuestionSet` ADD CONSTRAINT `QuestionSet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
