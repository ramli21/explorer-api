// src/routes/search.routes.ts
import { Elysia, t } from 'elysia';
import { FolderRepository } from '../repositories/folder.repository';

export const searchRoutes = new Elysia().get(
  '/search',
  ({ query: { q } }) => FolderRepository.searchFolders(q),
  {
    query: t.Object({
      q: t.String({ minLength: 2 }),
    }),
  },
);
