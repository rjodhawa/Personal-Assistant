import React, { Component } from 'react';
import cookie from 'react-cookies';
import Avatar from 'react-avatar';
import './home.css';
import 'typeface-roboto';
import axios from 'axios';
import LocationLogo from '../images/locationlogo.svg';
import Moment from 'react-moment';
import 'moment-timezone';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const styles = theme => ({
    root: {
        width: '55%',
        display: 'inline-block',
    },
    textField: {
        margin: '0% 5% 0% 5%',
        width: '35%',
        flexWrap: 'wrap',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: 'Only a man who knows what it is like to be defeated can reach down to the bottom of his soul and come up with the extra ounce of power it takes to win when the match is even.',
            copyright: '2017-19 theysaidso.com',
            author: 'Mohamad Ali',
            lat: '25',
            lon: '-79.9448754',
            city: 'Bloomfield',
            tempC: '',
            rainC: '',
            descC: '',
            tempT: '',
            rainT: '',
            descT: '',
            heading1: '',
            content1: '',
            url1: '',
            heading2: '',
            content2: '',
            url2: '',
            heading3: '',
            content3: '',
            url3: '',
            heading4: '',
            content4: '',
            url4: '',
            fact: '',
        };
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((response) => {
            this.setState({
                lat: response.coords.latitude,
                lon: response.coords.longitude
            });
            axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.lat + '&lon=' + this.state.lon + '&appid=94a1c3b403f6121e1f853430a802c52c&units=imperial')
                .then((response) => {
                    this.setState({
                        city: response.data.city.name,
                        tempC: response.data.list[0].main.temp,
                        rainC: response.data.list[0].rain['3h'],
                        descC: response.data.list[0].weather[0].description,
                        tempT: response.data.list[1].main.temp,
                        rainT: response.data.list[1].rain['3h'],
                        descT: response.data.list[1].weather[0].description,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
        axios.get('http://quotes.rest/qod.json?category=inspire')
            .then((response) => {
                this.setState({
                    quote: response.data.contents.quotes[0].quote,
                    copyright: response.data.contents.copyright,
                    author: response.data.contents.quotes[0].author,
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=2dbdaac0d8474e6e99753727f8816a45')
            .then((response) => {
                this.setState({
                    heading1: response.data.articles[0].title,
                    content1: response.data.articles[0].content + "::  Author: " + response.data.articles[0].author,
                    url1: response.data.articles[0].url,

                    heading2: response.data.articles[1].title,
                    content2: response.data.articles[1].content +  "::  Author: " + response.data.articles[1].author,
                    url2: response.data.articles[1].url,

                    heading3: response.data.articles[2].title,
                    content3: response.data.articles[2].content +  "::  Author: " + response.data.articles[2].author,
                    url3: response.data.articles[2].url,

                    heading4: response.data.articles[3].title,
                    content4: response.data.articles[3].content +  "::  Author: " + response.data.articles[3].author,
                    url4: response.data.articles[3].url,

                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChange = () => event => {
        if (event.target.value !== '') {
            axios.get('http://numbersapi.com/' + event.target.value)
                .then((response) => {
                    this.setState({
                        fact: response.data + '(http://numbersapi.com/)',
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    render() {
        const { classes } = this.props;
        const moment = require('moment-timezone');
        const { quote, copyright, author, city, tempC, rainC, descC, tempT, rainT, descT } = this.state;
        return (
            <div className="homepage">
                <Avatar src={cookie.load('profile-image')} size="100" round={true} />
                <h2>
                    Hello! {cookie.load('profile-name')}
                </h2>
                <h4>
                    "{quote}" - {author}  <p>
                        ({copyright})
                    </p>
                </h4>
                <br /><br />
                <h2>
                    <img src={LocationLogo} alt="location"></img>{city}
                </h2>
                <h3>, {descC}, {tempC} &#8457;, Rain: {Math.round(rainC * 100, 5)}% | </h3>
                <h3>Next three hours: ({descT}, {tempT} &#8457;, Rain: {Math.round(rainT * 100, 5)}%)</h3>
                <br /><br />
                <div className='timeZone'>
                    <div className='time'>
                        CST: <Moment format="HH:mm">{moment(new Date()).tz("America/Chicago")}</Moment>
                    </div>
                    <div className='time'>
                        PST: <Moment format="HH:mm">{moment(new Date()).tz("America/Los_Angeles")}</Moment>
                    </div>
                    <div className='time'>
                        EST: <Moment format="HH:mm">{moment(new Date()).tz("America/New_York")}</Moment>
                    </div>
                </div><br />
                <h1>Latest News</h1>
                <div className={classes.root}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{this.state.heading1}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography >{this.state.content1}</Typography>
                            <Button variant="outlined" target="_blank" href={this.state.url1} className={classes.button}>Read More!</Button>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{this.state.heading2}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography >{this.state.content2}</Typography>
                            <Button variant="outlined" target="_blank" href={this.state.url2} className={classes.button}>Read More!</Button>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{this.state.heading3}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography >{this.state.content3}</Typography>
                            <Button variant="outlined" target="_blank" href={this.state.url3} className={classes.button}>Read More!</Button>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{this.state.heading4}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography >{this.state.content4}</Typography>
                            <Button variant="outlined" target="_blank" href={this.state.url4} className={classes.button}>Read More!</Button>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <p>Credits: NewsAPI.org</p>
                </div>
                <TextField
                    id="outlined-number"
                    label="Number Trivia"
                    type="number"
                    className={classes.textField}
                    onChange={this.handleChange()}
                    variant="outlined"
                    rowsMax="1"
                    helperText= {this.state.fact}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Home);