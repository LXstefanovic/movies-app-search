import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Movies from './containers/Movies';
import Header from './containers/Header';
import './services/interceptors';

/**
 * App component.
 * Main component of application. Responsible for 
 * routing and showing all content.
 */

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Router>
          <Route path="*" component={Header} />
          <Switch>
            <Route exact path="/" component={Movies} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    background: '#121a1a'
  }
});

export default withStyles(styles)(App);
