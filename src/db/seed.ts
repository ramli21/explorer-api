import { db } from './index';
import { folders, files } from './schema';

async function seed() {
  console.log('🌱 Start seeding...');

  // clear data (Optional)
  await db.delete(files);
  await db.delete(folders);

  // Create Root Folders
  const rootIds = [];
  for (let i = 1; i <= 10; i++) {
    const id = crypto.randomUUID();
    rootIds.push(id);
    await db.insert(folders).values({
      id: id,
      name: `Root Folder ${i}`,
      parentId: null,
    });
  }

  // Create Subfolders (Level 2)
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

  // Create Subfolders (Level 2)
  const subFolder2Ids = [];
  for (const subFolderId of subFolderIds) {
    for (let i = 1; i <= 5; i++) {
      const id = crypto.randomUUID();
      subFolder2Ids.push(id);
      await db.insert(folders).values({
        id: id,
        name: `Sub ${i} dari ${subFolderId.slice(0, 4)}`,
        parentId: subFolderId,
      });
    }
  }

  // Create many Data (Folder level 3 & files ) - Example 300 data only
  console.log('📂 Generating deep folders and files...');
  for (let i = 0; i < 300; i++) {
    const randomParent = subFolder2Ids[Math.floor(Math.random() * subFolder2Ids.length)];
    const folderId = crypto.randomUUID();

    await db.insert(folders).values({
      id: folderId,
      name: `Deep Folder ${i}`,
      parentId: randomParent,
    });

    // Adding file to the folder
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
