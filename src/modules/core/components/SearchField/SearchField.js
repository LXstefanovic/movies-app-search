import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

/**
 * SearchField component.
 * Rensposible for search input field along with search icon
 */

const SearchField = ({ classes, value, placeholder, handleChange, handleKeyDown }) => {
    return (
        <div className={classes.root}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder={placeholder}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

const styles = theme => ({
    root: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        borderBottom: theme.palette.common.white,
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing.unit,
          width: "auto"
        }
      },
      searchIcon: {
        width: theme.spacing.unit * 3,
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      inputRoot: {
        color: "inherit",
        width: "100%"
      },
      inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 4,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: 120,
          "&:focus": {
            width: 200
          }
        }
      }
});

SearchField.propTypes = {
    /**
     * Override or extend the styles applied to the component.
    */
    classes: PropTypes.object.isRequired,
    /**
     * The input value, required for a controlled component.
    */
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.object,
        PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object]),
        ),
    ]),
    /**
     * The short hint displayed in the input before the user enters a value.
    */
    placeholder: PropTypes.string,
    /**
     * Function that has been executed on every input change.
    */
    handleChange: PropTypes.func,
    /**
     * Function that has been executed on every key down event.
    */
    handleKeyDown: PropTypes.func
};

export default withStyles(styles)(SearchField);
