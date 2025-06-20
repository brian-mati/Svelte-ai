CREATE TABLE "conversation" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" varchar NOT NULL,
	"response" varchar NOT NULL,
	"prompt_tokens" integer NOT NULL,
	"completion_tokens" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "test" CASCADE;