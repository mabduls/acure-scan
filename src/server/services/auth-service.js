const {
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    collection,
    doc,
    setDoc
} = require('../config/firebase');

const registerUser = async (email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const usersCollection = collection(db, 'users');
        await setDoc(doc(usersCollection, user.uid), {
            name,
            email,
            createdAt: new Date().toISOString()
        });

        return {
            uid: user.uid,
            email: user.email,
            name
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        return {
            uid: user.uid,
            email: user.email,
            token: user.accessToken
        };
    } catch (error) {
        let message = 'Login failed';
        switch (error.code) {
            case 'auth/invalid-email':
                message = 'Invalid email address';
                break;
            case 'auth/user-disabled':
                message = 'This account has been disabled';
                break;
            case 'auth/user-not-found':
                message = 'No account found with this email';
                break;
            case 'auth/wrong-password':
                message = 'Incorrect password';
                break;
            default:
                message = error.message;
        }
        throw new Error(message);
    }
};

const logoutUser = async () => {
    try {
        await signOut(auth);

        // Clear any stored tokens or user data from localStorage/sessionStorage
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userData');

        return true;
    } catch (error) {
        console.error('Logout error:', error);
        throw new Error(error.message);
    }
};

module.exports = { registerUser, loginUser, logoutUser };
