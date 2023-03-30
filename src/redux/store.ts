import { configureStore} from "@reduxjs/toolkit";
import characterSlice from "./characterSlice";

const store = configureStore({
    reducer:{
        character: characterSlice,
    }
});

// Tipamos el hook useSelector y useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;