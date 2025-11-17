import { configureStore } from "@reduxjs/toolkit";
import UserRedcuer from './userSlice';
import FeedReducer from './feedSlice';
import ConnectionReducer from './connectionSlice';
import RequestReducer from './requestSlice';

const appStore = configureStore({
    reducer: {
        user: UserRedcuer,
        feed: FeedReducer,
        connections: ConnectionReducer,
        requests: RequestReducer,
    }

})

export default appStore;