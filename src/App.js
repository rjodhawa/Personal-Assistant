import React, { Component } from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';
import Header from './Components/Header/header';
import cookie from 'react-cookies';

class App extends Component {
  login = (response) => {
    var profile = response.getBasicProfile();
    this.setState({
      tokenID: response.Zi.id_token
    });
    cookie.save('tokenID', response.Zi.id_token, { path: '/' });
    cookie.save('profile-image', profile.getImageUrl(), { path: '/' });
    cookie.save('profile-name', profile.getName(), { path: '/' });
  }

  constructor(props) {
    super(props);
    this.state = {
      tokenID: cookie.load('tokenID') || 'logged-out',
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.tokenID === 'logged-out' ?
          <div>
            <GoogleLogin
              clientId="833225793301-lt36i2qeunug6ujl34os9r9lrpv82e6p.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.login}
            />
          </div> :
          <div>
            <Header></Header>
          </div>
        }
      </div>
    );
  }
}
export default App;