import { useReducer } from 'react';
import { gameActionCreators } from './action-creators.ts';
import { initialState, reducer } from './reducer.ts';


export const useGameReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { ...state, ...gameActionCreators(dispatch) };
};
