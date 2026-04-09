import { db } from './index';
import { folders, files } from './schema';

async function seed() {
  console.log('🌱 Start seeding...');

  // 1. Bersihkan database (Optional)
  await db.delete(files);
  await db.delete(folders);

  // 2. Buat Root Folders (seperti C:, D:, atau Documents)
  const rootIds = [];
  for (let i = 1; i <= 5; i++) {
    const id = crypto.randomUUID();
    rootIds.push(id);
    await db.insert(folders).values({
      id: id,
      name: `Root Folder ${i}`,
      parentId: null,
    });
  }

  // 3. Buat Subfolders (Level 1)
  const subFolderIds = [];
  for (const rootId of rootIds) {
    for (let i = 1; i <= 3; i++) {
      const id = crypto.randomUUID();
      subFolderIds.push(id);
      await db.insert(folders).values({
        id: id,
        name: `Sub ${i} dari ${rootId.slice(0, 4)}`,
        parentId: rootId,
      });
    }
  }

  // 4. Buat Jutaan/Ribuan Data (Level 2 & Files) - Contoh 100 data saja
  console.log('📂 Generating deep folders and files...');
  for (let i = 0; i < 100; i++) {
    const randomParent = subFolderIds[Math.floor(Math.random() * subFolderIds.length)];
    const folderId = crypto.randomUUID();

    await db.insert(folders).values({
      id: folderId,
      name: `Deep Folder ${i}`,
      parentId: randomParent,
    });

    // Tambahkan file ke dalam folder tersebut
    await db.insert(files).values({
      id: crypto.randomUUID(),
      name: `Document_${i}.pdf`,
      folderId: folderId,
      sizeBytes: Math.floor(Math.random() * 1000000).toString(),
    });
  }

  console.log('✅ Seeding finished!');
  process.exit(0);
}

seed();
