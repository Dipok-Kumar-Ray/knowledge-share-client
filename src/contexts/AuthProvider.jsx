import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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


    const userInfo = {
        user,
        loading,
        signInWithGoogle,
        createUser,

    }


    return <AuthContext userInfo={userInfo}>
        {children}
        </AuthContext>
};

export default AuthProvider;