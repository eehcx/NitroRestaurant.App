import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    displayName: '',
    rol: '',
    email: '',
    photoURL: '',
    uid: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState, 
    reducers: {
        addUser: (state, action) => {
            const { status, displayName, rol, email, photoURL, uid } = action.payload;
            state.status = status;
            state.displayName = displayName;
            state.rol = rol;
            state.email = email;
            state.photoURL = photoURL;
            state.uid = uid;
        }
    },
});

export const { 
    addUser
} = userSlice.actions;

export default userSlice.reducer;
export { initialState as userInitialState };