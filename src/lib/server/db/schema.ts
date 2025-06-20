import { pgTable, serial, integer, varchar, timestamp, text } from 'drizzle-orm/pg-core';

// export const test = pgTable('test', {
// 	id: serial('id').primaryKey(),
// 	age: integer('age')
// });

export const conversation = pgTable('conversation', {
	id: serial('id').primaryKey(),
	question: varchar('question').notNull(),
	response: text('response').notNull(),
	prompt_tokens: integer('prompt_tokens').notNull(),
	completion_tokens: integer('completion_tokens').notNull(),
	created_at: timestamp('created_at').defaultNow().notNull()
});

export type Conversation = typeof conversation.$inferInsert;
