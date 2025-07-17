import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';



const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [loading,setLoading]=useState(true);
    const [user, setUser]=useState(null)

    const createUser =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const loginWithGoogle =()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }

    const logOutUser =()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe =onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)

        })
        return ()=>{
            unSubscribe
        }
    },[])


    const authInfo ={
        loading,
        user,
        createUser,
        loginUser,
        loginWithGoogle,
        logOutUser
        
        

    }
    return (
       <AuthContext.Provider value={authInfo}>
        {children}

       </AuthContext.Provider>
    );
};

export default AuthProvider;