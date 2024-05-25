import { configureStore } from "@reduxjs/toolkit";
import complHikingsSlice from "../features/completedHikings/completedHikingsSlice.jsx";
//import addHikingSlice from "../features/addHiking/addHikingSlice";

const rootReducers = {
    complHikings: complHikingsSlice,
    //addHiking: addHikingSlice
};
  
const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
});
  
export default store;