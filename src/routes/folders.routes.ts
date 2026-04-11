// src/routes/folder.routes.ts
import { Elysia, t } from 'elysia';
import { FolderRepository } from '../repositories/folder.repository';

export const folderRoutes = new Elysia({ prefix: '/folders' })
  // Get root folders
  .get('/tree', () => FolderRepository.findRootFolders())

  .get(
    '/:id/content',
    async ({ params: { id } }) => {
      const [folders, files] = await Promise.all([
        FolderRepository.findSubFolders(id),
        FolderRepository.findFilesByFolder(id),
      ]);
      return { folders, files };
    },
    {
      // validation for :id parameter, must be a UUID string
      params: t.Object({
        id: t.String({ format: 'uuid' }),
      }),
    },
  )

  .get('/test-error', () => {
    // Example for testing error handling
    throw new Error('This is a test error');
  });
