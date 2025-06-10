// src/scripts/services/scan-service.js
import { db, doc, collection, getDocs, query, where, orderBy, getDoc, setDoc, auth, serverTimestamp } from '../../server/config/firebase';

class ScanService {
    static async saveScan(userId, scanData) {
        try {
            const userRef = doc(db, 'users', userId);
            const scansCollection = collection(userRef, 'scans');

            const newScanRef = doc(scansCollection);

            await setDoc(newScanRef, {
                ...scanData,
                createdAt: serverTimestamp(),
                timestamp: new Date().toISOString()
            });

            return newScanRef.id;
        } catch (error) {
            console.error('Error saving scan:', error);
            throw error;
        }
    }

    static async getUserScans(userId, userToken = null) {
        try {
            let token = userToken;

            if (!token && auth.currentUser) {
                token = await auth.currentUser.getIdToken();
            }

            if (!token) {
                const storedToken = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
                if (storedToken) {
                    token = storedToken;
                }
            }

            if (!token) {
                throw new Error('Authentication token not available');
            }

            const userRef = doc(db, 'users', userId);
            const scansRef = collection(userRef, 'scans');

            let q;
            try {
                q = query(scansRef, orderBy('createdAt', 'desc'));
            } catch (orderError) {
                // Jika orderBy createdAt gagal, coba dengan timestamp
                console.warn('Failed to order by createdAt, trying timestamp:', orderError);
                q = query(scansRef, orderBy('timestamp', 'desc'));
            }

            const scansSnapshot = await getDocs(q);

            return scansSnapshot.docs.map(doc => {
                const data = doc.data();

                // Handle timestamp conversion from Firestore
                let timestamp = data.timestamp;
                if (data.createdAt && data.createdAt.toDate) {
                    timestamp = data.createdAt.toDate().toISOString();
                } else if (data.createdAt && typeof data.createdAt === 'string') {
                    timestamp = data.createdAt;
                } else if (!timestamp) {
                    timestamp = new Date().toISOString();
                }

                return {
                    id: doc.id,
                    scanId: doc.id,
                    ...data,
                    timestamp: timestamp,
                    confidence: data.confidence || 0,
                    dominantAcne: data.dominantAcne || 'Unknown',
                    image: data.image || '',
                    recommendations: data.recommendations || { ingredients: [], treatment: [], severity: 'Unknown' }
                };
            });
        } catch (error) {
            console.error('Error getting user scans:', error);

            // PERBAIKAN 4: Berikan error message yang lebih spesifik
            if (error.code === 'permission-denied') {
                throw new Error('Permission denied. Please login again.');
            } else if (error.code === 'failed-precondition') {
                throw new Error('Database index required. Please contact administrator.');
            } else {
                throw new Error(`Failed to load scan history: ${error.message}`);
            }
        }
    }

    static async getScanById(userId, scanId) {
        try {
            const userRef = doc(db, 'users', userId);
            const scanRef = doc(collection(userRef, 'scans'), scanId);
            const scanDoc = await getDoc(scanRef);

            if (!scanDoc.exists()) {
                throw new Error('Scan not found');
            }

            const data = scanDoc.data();

            // Handle timestamp conversion
            let timestamp = data.timestamp;
            if (data.createdAt && data.createdAt.toDate) {
                timestamp = data.createdAt.toDate().toISOString();
            } else if (data.createdAt && typeof data.createdAt === 'string') {
                timestamp = data.createdAt;
            }

            return {
                id: scanDoc.id,
                scanId: scanDoc.id,
                ...data,
                timestamp: timestamp
            };
        } catch (error) {
            console.error('Error getting scan:', error);
            throw error;
        }
    }
}

export default ScanService;