import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MovieCard from '../../modules/movies/components/MovieCard/MovieCard';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as R from 'ramda'
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from "material-ui-flat-pagination";
import MovieDetails from '../../modules/movies/components/MovieDetails';
import classNames from 'classnames';
import { fade } from "@material-ui/core/styles/colorManipulator";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { searchMovies } from '../../modules/movies';

const ITEMS_PER_PAGE = 10;

/**
 * Movies component.
 * Rensposible for showing list of movies with pagination
 */

class Movies extends React.Component {
    constructor(props) {
        super(props)
        this.detailsRef = React.createRef(); 
    }

    state = {
        movieDetailsOpen: false,
        currentMovie: {},
        pageOffset: 0
    };

    showMovieDetails = (index) => () => {
        const { moviesData } = this.props;
        const moviesList = R.propOr([], 'data', moviesData);

        this.setState(prevState => {
            return { 
                movieDetailsOpen: !prevState.movieDetailsOpen,
                currentMovie:  moviesList[index]
            };
        }, () => {
            this.detailsRef.current.scrollIntoView(true);
        });
    }

    handleClickAway = () => {
        const { movieDetailsOpen } = this.state;
        if (movieDetailsOpen) {
            this.setState(() => {
                return { movieDetailsOpen: false };
            });
        }
    }

    handleClickPage = (offset) => {
        this.setState({ pageOffset: offset });
        const { searchMovies } = this.props;

        searchMovies({
            page: Math.ceil((offset + 1) / ITEMS_PER_PAGE)
        })
    }

    componentDidUpdate(prevProps) {
        const { moviesData } = this.props;
        const prevParams = R.pathOr({}, ['moviesData', 'search', 'params'], prevProps);
        const params = R.pathOr({}, [ 'search', 'params'], moviesData);
        if (R.prop('s', prevParams) !== R.prop('s', params)) {
            this.setState({ pageOffset: 0 });
        }
    }

    render() {
        const { classes, moviesData, error } = this.props;
        const { movieDetailsOpen, currentMovie, pageOffset } = this.state;
        const moviesList = R.propOr([], 'data', moviesData);
        const loading = R.propOr([], 'loading', moviesData);
        const totalItems = R.pathOr(0, ['search', 'total'], moviesData);
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        return (
            <div className={classes.root}>
                {loading && (<CircularProgress color="primary" />)}
                {!loading && error && (<h4 className={classes.error}>{`There is an error: ${error}`}</h4>)} 
                { !loading && !error && (
                <Fragment>
                    <div ref={this.detailsRef} className={classNames(classes.fullWidth, {
                        [classes.hide]: !movieDetailsOpen
                    })}>
                        <div className={classNames(classes.content, classes.movieDetailsWrapper)}>
                            { movieDetailsOpen && (
                            <ClickAwayListener onClickAway={this.handleClickAway}>
                                <MovieDetails open={movieDetailsOpen} movie={currentMovie} />
                            </ClickAwayListener>)}
                        </div>
                    </div>
                    <Grid container className={classes.content}>
                        { moviesList.map((item, index) =>(
                            <Grid 
                                item 
                                className={classes.movieWrapper} 
                                onClick={this.showMovieDetails(index)}
                                key={`movie-${R.prop('imdbID', item)}`}
                            >
                                <MovieCard 
                                    title={R.prop('Title', item)} 
                                    image={R.prop('Poster', item)}
                                    year={R.prop('Year', item)} 
                                    rating={R.prop('imdbRating', item) / 2}
                                    duration={R.prop('Runtime', item)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        limit={10}
                        offset={pageOffset}
                        total={totalPages}
                        onClick={(e, offset) => this.handleClickPage(offset)}
                    />
                </Fragment>)
            }
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
        position: 'relative',
        background: '#121a1a',
        textAlign: 'center'
    },
    content: {
        width: '1100px',
        margin: '0 auto',
        [theme.breakpoints.down('md')]: {
            width: '900px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '600px',
        },
        [theme.breakpoints.down('xs')]: {
            width: '380px',
        },
    },
    movieWrapper: {
        margin: `${theme.spacing.unit}px 0`
    },
    movieDetailsWrapper: {
        color: theme.palette.common.white,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    fullWidth: {
        marginLeft: - theme.spacing.unit * 2,
        marginRight: - theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 4,
        backgroundImage: "url('/images/background.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        '&:before': {
            content: "''",
            width: '100%',
            height: '100%',
            background: fade(theme.palette.common.black, 0.5),
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            cursor: 'pointer'
        }
    },
    hide: {
        display: 'none'
    },
    error: {
        color: theme.palette.secondary.main
    }
});

Movies.propTypes = {
    /**
     * Override or extend the styles applied to the component.
    */
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    moviesData: state.movies,
    error: R.pathOr('', ['movies', 'data', 'Error'], state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        searchMovies
    }, dispatch);
};

export default R.pipe(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles),
  )(Movies);