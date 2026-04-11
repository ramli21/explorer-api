import { Elysia } from 'elysia';
import { folderRoutes } from './routes/folders.routes';
import { searchRoutes } from './routes/search.routes';
import { cors } from '@elysiajs/cors';

const app = new Elysia()
  .use(cors())
  .onError(({ code, error, set }) => {
    if (code === 'NOT_FOUND') {
      set.status = 404;
      return {
        status: 'error',
        code: 404,
        message: 'Endpoint atau resource tidak ditemukan.',
        suggestion: 'Pastikan URL dan metode HTTP yang Anda gunakan sudah benar.',
      };
    }

    if (code === 'VALIDATION') {
      set.status = 422;
      return {
        status: 'error',
        code: 422,
        message: 'Data yang dikirim tidak valid.',
        errors: error.all, // Menampilkan detail field mana yang salah
      };
    }

    set.status = 500;
    return {
      status: 'error',
      code: 500,
      message: 'Terjadi kesalahan internal pada server.',
      detail: error,
    };
  })
  .group('/api', (app) => app.use(folderRoutes).use(searchRoutes))
  .listen(process.env.PORT || 3000);
