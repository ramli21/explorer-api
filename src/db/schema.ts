import { mysqlTable, varchar, index, timestamp, char } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const folders = mysqlTable(
  'folders',
  {
    id: char('id', { length: 36 }).primaryKey(), // Menggunakan UUID string
    name: varchar('name', { length: 255 }).notNull(),
    parentId: char('parent_id', { length: 36 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  },
  (table) => [index('parent_idx').on(table.parentId), index('name_idx').on(table.name)],
);

export const files = mysqlTable('files', {
  id: char('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  folderId: char('folder_id', { length: 36 }).notNull(),
  sizeBytes: varchar('size_bytes', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const foldersRelations = relations(folders, ({ one, many }) => ({
  parent: one(folders, {
    fields: [folders.parentId],
    references: [folders.id],
    relationName: 'folder_hierarchy',
  }),
  children: many(folders, {
    relationName: 'folder_hierarchy',
  }),
  files: many(files),
}));
