// IndexedDB configuration
const DB_NAME = 'whispernet_db';
const DB_VERSION = 1;

// Database stores
const STORES = {
    businesses: 'businesses',
    posts: 'posts',
    events: 'events',
    trendingTopics: 'trendingTopics',
    pendingPosts: 'pendingPosts',
    pendingReviews: 'pendingReviews',
    pendingPurchases: 'pendingPurchases'
};

// Initialize IndexedDB
export async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            console.error('Error opening database');
            reject(request.error);
        };

        request.onsuccess = () => {
            console.log('Database opened successfully');
            resolve(request.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Create object stores
            Object.values(STORES).forEach(storeName => {
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
                }
            });
        };
    });
}

// Get data from store
export async function getFromDB(storeName) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME);

        request.onerror = () => reject(request.error);

        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = () => resolve(getAllRequest.result);
            getAllRequest.onerror = () => reject(getAllRequest.error);
        };
    });
}

// Save data to store
export async function saveToDB(storeName, data) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME);

        request.onerror = () => reject(request.error);

        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);

            // Handle both single items and arrays
            const items = Array.isArray(data) ? data : [data];
            
            let completed = 0;
            let errors = [];

            items.forEach(item => {
                const addRequest = store.put(item);

                addRequest.onsuccess = () => {
                    completed++;
                    if (completed === items.length) {
                        if (errors.length > 0) {
                            reject(errors);
                        } else {
                            resolve();
                        }
                    }
                };

                addRequest.onerror = () => {
                    errors.push(addRequest.error);
                    completed++;
                    if (completed === items.length) {
                        reject(errors);
                    }
                };
            });
        };
    });
}

// Delete data from store
export async function deleteFromDB(storeName, id) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME);

        request.onerror = () => reject(request.error);

        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const deleteRequest = store.delete(id);

            deleteRequest.onsuccess = () => resolve();
            deleteRequest.onerror = () => reject(deleteRequest.error);
        };
    });
}

// Clear store
export async function clearStore(storeName) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME);

        request.onerror = () => reject(request.error);

        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const clearRequest = store.clear();

            clearRequest.onsuccess = () => resolve();
            clearRequest.onerror = () => reject(clearRequest.error);
        };
    });
}

// Get store count
export async function getStoreCount(storeName) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME);

        request.onerror = () => reject(request.error);

        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const countRequest = store.count();

            countRequest.onsuccess = () => resolve(countRequest.result);
            countRequest.onerror = () => reject(countRequest.error);
        };
    });
}