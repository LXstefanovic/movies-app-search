import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from 'material-ui-rating';
import { fade } from "@material-ui/core/styles/colorManipulator";

/**
 * MovieCard component.
 * Rensposible for showing one movie card
 */

const MovieCard = ({ classes, title, image, year, rating, duration }) => {
    return (
        <div className={classes.root}>
            <div className={classes.imageWrapper}>
                <img className={classes.image} src={image} alt="Poster" />
            </div>
            <Typography className={classes.title} variant="subtitle1">
                {title}{` (${year})`}
            </Typography>
            <div className={classes.titleWrapper}>
                <Rating
                    classes={{
                        root: classes.ratingRoot,
                        iconButton: classes.smallRating,
                        icon: classes.ratingColor
                    }}
                    value={rating}
                    max={5}
                    readOnly
                />    
                <Typography className={classes.duration}>
                    {duration}
                </Typography>
            </div>
        </div>
    );
};

const styles = theme => ({
    root: {
        padding: theme.spacing.unit,
        width: '200px',
        [theme.breakpoints.down('sm')]: {
            width: '170px',
        },
    },
    image: {
        [theme.breakpoints.down('sm')]: {
            width: '170px',
            height: '255px'
        },
        height: '300px',
        width: '200px',
        borderRadius: theme.spacing.unit,
        cursor: 'pointer'
    },
    imageWrapper: {
        position: 'relative',
        height: '300px',
        width: '200px',
        [theme.breakpoints.down('sm')]: {
            width: '170px',
            height: '255px'
        },
        '&:hover:after': {
            content: "''",
            width: '100%',
            height: '100%',
            background: fade(theme.palette.primary.main, 0.9),
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            cursor: 'pointer'
        }
    },
    title: {
        color: theme.palette.common.white,
        marginLeft: theme.spacing.unit / 2,
        textTransform: 'capitalize',
        fontSize: '14px',
        textAlign: 'left',
        cursor: 'pointer'
    },
    year: {
        marginLeft: theme.spacing.unit,
        fontWeight: 'bold'
    },
    smallRating: {
        padding: 0
    },
    ratingColor: {
        color: theme.palette.primary.main,
        height: '20px'
    },
    ratingRoot: {
        lineHeight: `${theme.spacing.unit * 2}px`
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    duration: {
        color: theme.palette.grey[500]
    }
});

MovieCard.propTypes = {
    /**
     * Override or extend the styles applied to the component.
    */
    classes: PropTypes.object.isRequired,
    /**
     * Title of the movie
    */
    title: PropTypes.string,
    /**
     * Image source of movie poster
    */
    image: PropTypes.string,
    /**
     * Year of release
    */
    year: PropTypes.string,
    /**
     * Movie rating
    */
    rating: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    /**
     * Movie duration
    */
    duration: PropTypes.string
};

export default withStyles(styles)(MovieCard);

