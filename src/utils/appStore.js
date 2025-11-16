import { configureStore } from "@reduxjs/toolkit";
import UserRedcuer from './userSlice';

const appStore = configureStore({
    reducer: {
        user: UserRedcuer,
    }

})

export default appStore;