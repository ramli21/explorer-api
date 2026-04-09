import { expect, test, describe } from 'bun:test';

describe('API Test', () => {
  test('Harus mengembalikan status 200', async () => {
    const response = await fetch('http://localhost:3000/api/folders/tree');
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  test('Harus mengembalikan status 404 : Error', async () => {
    const response = await fetch('http://localhost:3000/api/abcd');
    expect(response.status).toBe(404);
  });

  test('Harus gagal mencari content folder dengan ID yang asal : Error', async () => {
    const response = await fetch('http://localhost:3000/api/folders/bukan-uuid/content');
    expect(response.status).toBe(422);
  });

  test('Harus mengembalikan 200 jika format UUID benar', async () => {
    const validId = '550e8400-e29b-41d4-a716-446655440000';
    const response = await fetch(`http://localhost:3000/api/folders/${validId}/content`);

    expect(response.status).not.toBe(422);
  });

  test('Pencarian harus mengembalikan hasil yang sesuai', async () => {
    const query = 'Root Folder 3';
    const response = await fetch(`http://localhost:3000/api/search?q=${query}`);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0].name.toLowerCase()).toContain(query.toLowerCase());
    }
  });

  test('Harus mengembalikan status 500 : Error', async () => {
    const response = await fetch('http://localhost:3000/api/folders/test-error');
    expect(response.status).toBe(500);
  });
});
