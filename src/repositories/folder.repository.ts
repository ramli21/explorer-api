import { db } from '../db';
import { folders, files } from '../db/schema';
import { eq, isNull, like, or } from 'drizzle-orm';

export const FolderRepository = {
  // Ambil folder root (parent_id is null)
  findRootFolders: async () => {
    return await db.query.folders.findMany({
      where: isNull(folders.parentId),
      with: {
        children: true,
      },
    });
  },

  // Ambil subfolder berdasarkan parent_id
  findSubFolders: async (parentId: string) => {
    return await db.query.folders.findMany({
      where: eq(folders.parentId, parentId),
    });
  },

  // Ambil file berdasarkan folder_id (Poin Bonus)
  findFilesByFolder: async (folderId: string) => {
    return await db.query.files.findMany({
      where: eq(files.folderId, folderId),
    });
  },

  // Ambil struktur lengkap (Recursive) - Gunakan dengan hati-hati jika data jutaan
  // Biasanya hanya digunakan jika user memang butuh export seluruh tree
  findFullTree: async () => {
    return await db.query.folders.findMany({
      with: {
        children: true,
      },
    });
  },

  searchFolders: async (query: string) => {
    return await db.query.folders.findMany({
      where: or(
        like(folders.name, query),
        eq(folders.name, query),
        like(folders.name, `%${query}%`),
      ),
      limit: 50, // Batasi hasil untuk keamanan performa
    });
  },
};
