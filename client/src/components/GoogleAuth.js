import React from 'react';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '91473874696-2d9vgbo8uldfd6ci4u64umhu75av5gcj.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignIn = () => this.auth.signIn();

  onSignOut = () => this.auth.signOut();

  renderAuthButton() {
    const { isSignedIn } = this.state;

    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button
          className="ui red google button"
          onClick={this.onSignOut}
        >
          <i className="google icon"></i>Sign Out
        </button>
      );
    } else {
      return (
        <button
          className="ui red google button"
          onClick={this.onSignIn}
        >
          <i className="google icon"></i>
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return this.renderAuthButton();
  }
}

export default GoogleAuth;
