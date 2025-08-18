import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'

// Initialize Firebase (same config as before)
const firebaseConfig = {
    apiKey: "AIzaSyC0E89l78RZxPmE-IUb7YIqhdx5WISs_1I",
    authDomain: "acurescan.firebaseapp.com",
    projectId: "acurescan",
    storageBucket: "acurescan.firebasestorage.app",
    messagingSenderId: "186282247086",
    appId: "1:186282247086:web:f2bd99f70e9886f8d2be3f",
    measurementId: "G-4XL97CL9NF"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export async function handleRegister(request) {
    try {
        const { email, password, name } = await request.json()

        // Register with Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Store user data in Firestore
        await setDoc(doc(collection(db, 'users'), user.uid, {
            name,
            email,
            createdAt: new Date().toISOString()
        }))

    // Get token
    const token = await user.getIdToken()

        return new Response(JSON.stringify({
            uid: user.uid,
            email: user.email,
            name,
            token
        }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        let message = 'Registration failed'
        switch (error.code) {
            case 'auth/email-already-in-use':
                message = 'Email already registered'
                break
            case 'auth/invalid-email':
                message = 'Invalid email address'
                break
            case 'auth/weak-password':
                message = 'Password should be at least 6 characters'
                break
            default:
                message = error.message
        }
        throw { message, status: 400 }
    }
}

export async function handleLogin(request) {
    try {
        const { email, password } = await request.json()

        // Login with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Get token
        const token = await user.getIdToken()

        return new Response(JSON.stringify({
            uid: user.uid,
            email: user.email,
            token
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        let message = 'Login failed'
        switch (error.code) {
            case 'auth/invalid-email':
                message = 'Invalid email address'
                break
            case 'auth/user-disabled':
                message = 'This account has been disabled'
                break
            case 'auth/user-not-found':
                message = 'No account found with this email'
                break
            case 'auth/wrong-password':
                message = 'Incorrect password'
                break
            case 'auth/invalid-credential':
                message = 'Invalid email or password'
                break
            default:
                message = error.message
        }
        throw { message, status: 401 }
    }
}

export async function handleLogout(request) {
    try {
        await signOut(auth)
        return new Response(JSON.stringify({
            success: true,
            message: 'Logout successful'
        }), {
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        throw { message: error.message, status: 500 }
    }
}