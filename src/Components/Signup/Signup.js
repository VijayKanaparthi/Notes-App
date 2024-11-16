import { Component } from "react"
import { Link, withRouter } from "react-router-dom"

import logo from "../Assests/logo.png"
import "./Signup.css"

class Signup extends Component {
  state = { email: "", password: "", errorStatus: false, error: "" }

  email = (e) => {
    this.setState({ email: e.target.value })
  }

  password = (e) => {
    this.setState({ password: e.target.value })
  }

  renderLogin = () => {
    const { history } = this.props
    history.replace("/login")
    alert("Please Login!")
  }

  signup = async (e) => {
    e.preventDefault()
    const { email, password } = this.state
    const url = "http://localhost:4000/signup"
    const userDetails = {
      email,
      password,
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      this.renderLogin()
    }
    const data = response.json()
    console.log(data.message)

    this.setState({ error: data.message, errorStatus: true })
  }
  render() {
    const { errorStatus, error } = this.state
    return (
      <div className="main">
        <div className="signup-container">
          <div className="logo-container-signup">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <form className="form-container-signup " onSubmit={this.signup}>
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
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
            <p>
              Already Account ? <Link to="/login">login</Link>
            </p>
            <div>
              {errorStatus ? (
                <p style={{ color: "red" }}>*User Already Exist</p>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default Signup
