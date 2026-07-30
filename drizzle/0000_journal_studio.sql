CREATE TABLE `journal_posts` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `owner_email` text NOT NULL,
  `title` text NOT NULL,
  `slug` text NOT NULL,
  `category` text NOT NULL,
  `published_at` text NOT NULL,
  `excerpt` text NOT NULL,
  `body` text NOT NULL,
  `status` text DEFAULT 'draft' NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `journal_posts_slug_unique` ON `journal_posts` (`slug`);
