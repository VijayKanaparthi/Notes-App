import { Component } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"

import logo from "../Assests/logo.png"
import "./Login.css"

class Login extends Component {
  state = { email: "", password: "", error: "", showError: false }

  navigateToHome = (jwtToken) => {
    const { history } = this.props
    Cookies.set("jwt_token", jwtToken, { expires: 30 })
    history.replace("/")
  }

  login = async (e) => {
    e.preventDefault()
    const { email, password } = this.state
    const userDetails = {
      email,
      password,
    }
    const url = "http://localhost:4000/login"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.navigateToHome(data.jwt_token)
    } else {
      this.setState({ error: data.message, showError: true })
    }
  }

  email = (e) => {
    this.setState({ email: e.target.value })
  }

  password = (e) => {
    this.setState({ password: e.target.value })
  }

  render() {
    const { error, showError } = this.state
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="logo-container">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <form className="login-form" onSubmit={this.login}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter Email"
                required
                onChange={this.email}
              />
            </div>
            <div>
              <label htmlFor="password">password</label>
              <input
                type="password"
                placeholder="Password..."
                required
                onChange={this.password}
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            <p>
              Create Account?{" "}
              <Link to="/signup">
                {" "}
                <span>Click here</span>
              </Link>
            </p>
            <div>
              {showError ? <p className="error-message">*{error}</p> : ""}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
