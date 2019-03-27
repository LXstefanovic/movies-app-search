import { combineReducers } from 'redux';
import { searchMoviesReducer } from '../modules/movies';

export default combineReducers({
    movies: searchMoviesReducer
});