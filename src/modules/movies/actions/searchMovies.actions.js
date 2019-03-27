import axios from 'axios';
import * as actionTypes from './searchMovies.action-types';
import { url } from '../../../services/config';
import * as R from 'ramda';

const searchType = "movie";

const searchMoviesSuccess = res => ({
    type: actionTypes.SEARCH_MOVIE_SUCCESS_ACTION,
    payload: res
  });
  
  const searchMoviesError = error => ({
    type: actionTypes.SEARCH_MOVIE_FAILURE_ACTION,
    error
  });
  
  export const searchMovies = (params) => (dispatch, getState) => {
    const state = getState();
    const paramsState = R.pathOr({}, ['movies', 'search', 'params'], state);
    const getParams = { ...paramsState, ...params};

    dispatch({
      type: actionTypes.SEARCH_MOVIE_REQUEST_ACTION
    });
    return axios.get(url, {
        params: {
          type: searchType,
          ...getParams
        }
    })
      .then(res => {
        if (R.path(['data', 'Error'], res)) {
            dispatch(searchMoviesError(R.prop('data', res)));
            return;
        }

        const promises = [];
        R.pathOr([], ['data', 'Search'], res).forEach( movie => {
            promises.push(axios.get(`${url}?i=${R.prop('imdbID', movie)}`))
        });
          
        axios.all(promises).then(results => {
            const payload = {
                search: {
                    total: R.pathOr(0, ['data', 'totalResults'], res),
                    params: getParams
                },
                data: R.pluck('data', results)
            };
            dispatch(searchMoviesSuccess(payload))
        });
      })
      .catch(error => dispatch(searchMoviesError(R.path(['response', 'data'], error))));
  };