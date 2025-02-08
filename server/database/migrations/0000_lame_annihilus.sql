CREATE TABLE `polls` (
	`id` text PRIMARY KEY NOT NULL,
	`question` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `responses` (
	`id` text PRIMARY KEY NOT NULL,
	`response` text NOT NULL,
	`order` integer NOT NULL,
	`poll_id` text NOT NULL,
	FOREIGN KEY (`poll_id`) REFERENCES `polls`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "question_minimum" CHECK("responses"."order" > -1),
	CONSTRAINT "question_maximum" CHECK("responses"."order" < 8)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `question_order_unique_per_poll` ON `responses` (`poll_id`,`order`);--> statement-breakpoint
CREATE TABLE `votes` (
	`id` text PRIMARY KEY NOT NULL,
	`poll_id` text NOT NULL,
	`response_id` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`poll_id`) REFERENCES `polls`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`response_id`) REFERENCES `responses`(`id`) ON UPDATE no action ON DELETE no action
);
