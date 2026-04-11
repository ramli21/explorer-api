import { db } from '../db';
import { folders, files } from '../db/schema';
import { eq, isNull, like, or } from 'drizzle-orm';

export const FolderRepository = {
  // Get root folders (parent_id is null)
  findRootFolders: async () => {
    return await db.query.folders.findMany({
      where: isNull(folders.parentId),
      with: {
        children: true,
      },
    });
  },

  // Get subfolders by parent_id
  findSubFolders: async (parentId: string) => {
    return await db.query.folders.findMany({
      where: eq(folders.parentId, parentId),
    });
  },

  // Get files by folder_id
  findFilesByFolder: async (folderId: string) => {
    return await db.query.files.findMany({
      where: eq(files.folderId, folderId),
    });
  },

  // Get complete folder tree (Recursive)
  findFullTree: async () => {
    return await db.query.folders.findMany({
      with: {
        children: true,
      },
    });
  },

  // Find folders by query (string)
  searchFolders: async (query: string) => {
    return await db.query.folders.findMany({
      where: or(
        like(folders.name, `${query}%`),
        like(folders.name, `%${query}%`),
        like(folders.name, `%${query}`),
      ),
      limit: 50, // Limit results for performance safety
    });
  },

  // Find files by query (string)
  searchFiles: async (query: string) => {
    return await db.query.files.findMany({
      where: or(
        like(files.name, `${query}%`),
        like(files.name, `%${query}%`),
        like(files.name, `%${query}`),
      ),
      limit: 50, // Limit results for performance safety
    });
  },
};
