import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GrFormViewHide, GrFormView} from 'react-icons/gr'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isShowPassword: false}

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(response)
    try {
      if (response.ok) {
        const {history} = this.props
        Cookies.set('jwt_token', data.jwt_token, {
          expires: 30,
        })
        history.replace('/')
      } else {
        this.setState({errorMsg: data.error_msg})
      }
    } catch (e) {
      this.setState({errorMsg: data.error_msg})
      console.log(e.message)
    }
  }

  changeUsername = event => this.setState({username: event.target.value})

  changePassword = event => this.setState({password: event.target.value})

  showHidePassword = () =>
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/" />
    }
    const {username, password, errorMsg, isShowPassword} = this.state
    return (
      <div className="login-bg">
        <div className="small-device">
          <p>
            Sorry for the Inconvenience
            <br /> Please
          </p>
          <h1 className="small-device-heade">Open your Laptop/PC</h1>
        </div>
        <div className="login-page">
          <h1 className="login-heading">Welcome To Our Restaurant</h1>
          <div className="img-login-container">
            <img
              src="https://i.imgur.com/Nyqdh5P.png"
              alt="india map food"
              className="india-img"
            />
            <form onSubmit={this.onLogin} className="form-container">
              <h4 className="please-login">Please Login</h4>
              <div className="input-container">
                <label htmlFor="username" className="label-element">
                  USERNAME
                </label>
                <input
                  id="username"
                  className="input-element text"
                  type="text"
                  placeholder="User name"
                  value={username}
                  onChange={this.changeUsername}
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="label-element">
                  PASSWORD
                </label>
                <div className="input-element">
                  <input
                    id="password"
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={this.changePassword}
                    className="password"
                  />
                  <button
                    type="button"
                    onClick={this.showHidePassword}
                    className="password-button"
                  >
                    {isShowPassword ? <GrFormView /> : <GrFormViewHide />}
                  </button>
                </div>
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {errorMsg !== '' && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>

          <p className="tag-line">Bringing flavors straight to your home!</p>
        </div>
      </div>
    )
  }
}

export default Login
