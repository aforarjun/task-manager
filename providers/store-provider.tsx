"use client"

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { setUserData } from '@/store/slices/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase-config';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setLoading(true);

            if (authUser) {
                store.dispatch(setUserData({user: { uid: authUser.uid, email: authUser.email, username: authUser.displayName }, isAuthenticated: true}));
            } else {
                store.dispatch(setUserData({user: null, isAuthenticated: false}));
            }
            setLoading(false);
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe();

    }, []);

    return (
        <Provider store={store}>
            {loading ? <div>Loading...</div> : children}
        </Provider>
    );
};