import { pgTable, serial, integer, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';


export const chat = pgTable('chat', {
	id: serial('id').primaryKey(),
	chat_id: varchar('chat_id').notNull().unique(),
	title: text('title').notNull(),
	created_at: timestamp('created_at').defaultNow().notNull()
});

//  one chat has many conversations 
export const chatConversation = relations(chat,({many}) =>({
	convesations:many(conversation)
}) )
// a conversation belongs to one chat

export const conversation = pgTable('conversation', {
	id: serial('id').primaryKey(),
	chatId:integer('chat_id').references(() => chat.id , {onDelete:'cascade',onUpdate:'cascade'}).notNull(),
	question: varchar('question').notNull(),
	response: text('response').notNull(),
	prompt_tokens: integer('prompt_tokens').notNull(),
	completion_tokens: integer('completion_tokens').notNull(),
	created_at: timestamp('created_at').defaultNow().notNull()
});

export const conversationRelations = relations(conversation,({one}) => ({
	author:one(
		chat,{
			fields:[conversation.chatId],
			references:[chat.id]

		}
	)
}));

export type Conversation = typeof conversation.$inferInsert;

