import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

    //google sign in
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    //register login user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //login user
    const userLogin = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //sign out user
    const signout = () => {
        setLoading(true);
        return signOut(auth);
    }

    //onstate change/signOut
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log('User in the auth state change:', currentUser);
        }) 
        return () => {
            unsubscribe();
        }
    }, [])

    const userInfo = {
        user,
        loading,
        signInWithGoogle,
        createUser,
        userLogin,
        signout,

    }


    return <AuthContext value={userInfo}>
        {children}
        </AuthContext>
};

export default AuthProvider;