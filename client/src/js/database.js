import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: false});
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  const editorDb = await openDB('jate', 1);
  const tx = editorDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ jate: content });
  const result = await request;
  console.log('data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Getting all from DB');
  const editorDb = await openDB('jate', 1);
  const tx = editorDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate', {keyPath: 'id'});
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
