import { combineReducers } from "redux";
import { firebaseReducer, FirebaseReducer } from "react-redux-firebase";
import authReducer, { CounterState } from "../features/counter/counterSlice";

interface TypeInterface {
  counter: CounterState;
  firebase: FirebaseReducer.Reducer;
}

const rootReducer = combineReducers<TypeInterface>({
  counter: authReducer,
  firebase: firebaseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
