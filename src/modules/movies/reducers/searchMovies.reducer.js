import * as actionTypes from '../actions/searchMovies.action-types';

const initialState = {};

export const searchMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_MOVIE_REQUEST_ACTION:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SEARCH_MOVIE_SUCCESS_ACTION:
      return {
        ...state,
        data: action.payload.data,
        search: action.payload.search,
        loading: false
      };
    case actionTypes.SEARCH_MOVIE_FAILURE_ACTION:
      return {
        ...state,
        data: action.error,
        loading: false
      };
    default:
      return state;
  }
};
