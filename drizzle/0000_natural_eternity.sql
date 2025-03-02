CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventDate` date NOT NULL,
	`eventTime` time NOT NULL,
	`totalCost` int NOT NULL,
	`status` enum('pending','cancelled','confirmed','completed') DEFAULT 'pending',
	`userId` int NOT NULL,
	`packageEventId` int NOT NULL,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `packageEvent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(60) NOT NULL,
	`totalPrice` int NOT NULL,
	`description` varchar(255) NOT NULL,
	`waiters` int NOT NULL,
	`tableEventId` int NOT NULL,
	CONSTRAINT `packageEvent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tableEvent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(60) NOT NULL,
	`totalPrice` int NOT NULL,
	`description` varchar(255) NOT NULL,
	CONSTRAINT `tableEvent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(60) NOT NULL,
	`phoneNumber` varchar(14) NOT NULL,
	`email` varchar(75) NOT NULL,
	`password` varchar(255) NOT NULL,
	`admin` tinyint DEFAULT 0,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `events` ADD CONSTRAINT `events_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `events` ADD CONSTRAINT `events_packageEventId_packageEvent_id_fk` FOREIGN KEY (`packageEventId`) REFERENCES `packageEvent`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `packageEvent` ADD CONSTRAINT `packageEvent_tableEventId_tableEvent_id_fk` FOREIGN KEY (`tableEventId`) REFERENCES `tableEvent`(`id`) ON DELETE cascade ON UPDATE no action;