// src/routes/search.routes.ts
import { Elysia, t } from 'elysia';
import { FolderRepository } from '../repositories/folder.repository';

export const searchRoutes = new Elysia().get(
  '/search',
  async ({ query: { q } }) => {
    const [folders, files] = await Promise.all([
      FolderRepository.searchFolders(q),
      FolderRepository.searchFiles(q),
    ]);
    return { folders, files };
  },
  {
    query: t.Object({
      q: t.String({ minLength: 2 }),
    }),
  },
);
