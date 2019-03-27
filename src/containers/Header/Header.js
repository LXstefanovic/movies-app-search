import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { searchMovies } from '../../modules/movies';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchField from '../../modules/core/components/SearchField';

const ENTER_KEY = 13;

/**
 * Header component.
 * Rensposible for showing header with search functionality
 */

class Header extends React.Component {
    state = {
        name: '',
        year: ''
    }

    componentDidMount() {
        const { searchMovies } = this.props;

        searchMovies({
            s: 'Movie', //Default on first load
            page: 1
        })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleKeyDown = (e) => {
        const code = e.keyCode ? e.keyCode : e.which;
        const { name, year } = this.state;
        const { searchMovies } = this.props;

        if (code === ENTER_KEY) {
            searchMovies({
                s: name,
                y: year,
                page: 1
            })
        }
    }

    render() {
        const { classes } = this.props;
        const { name } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.bar}>
                    <Toolbar>
                        <SearchField 
                            value={name}
                            handleChange={this.handleChange('name')}
                            handleKeyDown={this.handleKeyDown}
                            placeholder="Search movies..."
                        />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: "100%"
    },
    bar: {
        background: theme.palette.primary.main
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    }
});

Header.propTypes = {
    /**
     * Override or extend the styles applied to the component.
    */
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        searchMovies
    }, dispatch);
};

export default R.pipe(
    connect(
        null,
        mapDispatchToProps
    ),
    withStyles(styles),
)(Header);