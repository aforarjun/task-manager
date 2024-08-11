import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/lib/interface';

interface InitialState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    isError: boolean;
    msg: string;
}

const initialState: InitialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    isError: false,
    msg: '',
};

export const authSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        setUserData: (state, { payload }) => {
            state.loading = false;
            state.isError = false;
            state.user = payload.user;
            state.isAuthenticated = payload.isAuthenticated;
        },
        clearErrorMsg: (state) => {
            state.msg = '';
            state.isError = false;
        },
    },
});

export const { setUserData, clearErrorMsg } = authSlice.actions;
export default authSlice.reducer;