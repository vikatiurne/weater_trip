export const idb =
  window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;

const createCollectionsInIndexDB = () => {
  if (!idb) {
    console.log('Браузер не підтримує IndexedDB');
    return;
  }
  const request = idb.open('trip-task', 2);

  request.onerror = (err) => console.log(`Error: ${err}`);
  request.onupgradeneeded = () => {
    const db = request.result;
    if (!db.objectStoreNames.contains('tripData')) {
      db.createObjectStore('tripData', { keyPath: 'id' });
    }
  };
  request.onsuccess = () => console.log('База даних відкрита');
};

export default createCollectionsInIndexDB