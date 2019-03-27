import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

/**
 * BadgeRating component.
 * Rensposible for showing rating badge
 */

const BadgeRating = ({ classes, rating }) => {
    return (
        <div className={classes.root}>
            {rating}
        </div>
    );
};

const styles = theme => ({
    root: {
        height: '24px',
        width: '24px',
        background: theme.palette.secondary.dark,
        color: theme.palette.common.white,
        padding: theme.spacing.unit,
        display: 'inline-block',
        margin: `0 ${theme.spacing.unit}px`,
        borderRadius: theme.shape.borderRadius,
        margin: '0 auto',
        fontSize: '14px',
        lineHeight: '24px',
        fontWeight: 'bold'
    }
});

BadgeRating.propTypes = {
    /**
     * Override or extend the styles applied to the component.
    */
    classes: PropTypes.object.isRequired,
    /**
     * Rating to show inside badge component.
    */
    rating: PropTypes.string.isRequired
};

export default withStyles(styles)(BadgeRating);
