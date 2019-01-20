import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Tutorial from './../Tutorial/tutorial';
import Home from './../Home/home';
import Diary from './../Diary/diary';
import cookie from 'react-cookies';
import Button from '@material-ui/core/Button';
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});
class Header extends Component {
    state = {
        value: 1,
    };

    logout = () => {
        console.log('logout');
        cookie.save('tokenID', 'logged-out', { path: '/' });
        window.location.reload();
    };
    
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange} variant="fullWidth">
                        <Tab label="Tutorial" />
                        <Tab label="Home" />
                        <Tab label="Personal Diary" />
                        <Tab label="Logout" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer><Tutorial></Tutorial></TabContainer>}
                {value === 1 && <TabContainer><Home></Home></TabContainer>}
                {value === 2 && <TabContainer><Diary></Diary></TabContainer>}
                {value === 3 && <div onClick={this.logout()}></div>}
            </div>
        );
    }
}
Header.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Header);