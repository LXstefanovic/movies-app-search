import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import { Grid } from '@material-ui/core';
import * as R from 'ramda';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import BadgeRating from '../../../core/components/BadgeRating';

/**
 * MovieDetails component.
 * Rensposible for showing details for selected movie
 */

const MovieDetails = ({ classes, open, movie }) => {
    const genres = R.prop('Genre', movie);
    const genresList = genres.split(',').join(' | ');

    return (
        <Grow in={open}>
            <Grid container className={classes.root}>
                <Grid item>
                    <img className={classes.image} src={R.prop('Poster', movie)} alt="Movie Poster" />
                </Grid>
                <Grid item className={classes.detailsWrapper}>
                    <Typography variant="h5" className={classNames(classes.title, classes.text)}>
                        {R.prop('Title', movie)}
                    </Typography>
                    <Typography variant="subtitle1" className={classNames(classes.subtitle, classes.text)}>
                        {R.prop('Year', movie)} | {genresList} | {R.prop('Rated', movie)}
                    </Typography>
                    <Typography variant="body1" className={classNames(classes.plot, classes.text)}>
                        {R.prop('Plot', movie)}
                    </Typography>
                    <Typography variant="body1" className={classNames(classes.director, classes.text)}>
                        <span className={classes.bold}>Directors: </span>{R.prop('Director', movie)}
                    </Typography>
                    <Typography variant="body1" className={classNames(classes.actors, classes.text)}>
                        <span className={classes.bold}>Actors: </span>{R.prop('Actors', movie)}
                    </Typography>
                    <Typography variant="body1" className={classNames(classes.production, classes.text)}>
                        <span className={classes.bold}>Production: </span>{R.prop('Production', movie)}
                    </Typography>
                    <Grid container>
                        <Grid item className={classes.ratings}>
                            <BadgeRating rating={R.prop('imdbRating', movie)} />
                            <Typography variant="body1" className={classNames(classes.ratingText, classes.text)}>
                                <span className={classes.bold}>IMDB Rating</span>
                            </Typography>
                        </Grid>
                        <Grid item className={classes.ratings}>
                            <BadgeRating rating={R.prop('Metascore', movie)} />
                            <Typography variant="body1" className={classNames(classes.ratingText, classes.text)}>
                                <span className={classes.bold}>Metascore</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grow>
    );
};

const styles = theme => ({
    root: {
        justifyContent: 'center'
    },
    text: {
        color: theme.palette.common.white,
        textAlign: 'left'
    },
    image: {
        height: '300px',
        width: '200px',
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    subtitle: {
        textTransform: 'uppercase'
    },
    plot: {
        maxWidth: '500px',
        padding: `${theme.spacing.unit}px 0`
    },
    detailsWrapper: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        maxWidth: '50%'
    },
    bold: {
        fontWeight: 'bold'
    },
    ratings: {
        margin: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
        textTransform: 'uppercase'
    },
    ratingText: {
        marginTop: theme.spacing.unit / 2
    }
});

MovieDetails.propTypes = {
    /**
     * Override or extend the styles applied to the component.
    */
    classes: PropTypes.object.isRequired,
    /**
     * Indicator rather to show component or not
    */
    open: PropTypes.bool.isRequired,
    /**
     * Movie object that holds relevant information.
    */
    movie: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieDetails);

