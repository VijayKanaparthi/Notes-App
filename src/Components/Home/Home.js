import { Component } from "react"
import { FaPlusSquare } from "react-icons/fa"
import { FaPen } from "react-icons/fa"
import { MdDeleteForever } from "react-icons/md"
import { FaRegStar } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { format } from "date-fns"
import Popup from "reactjs-popup"
import Cookies from "js-cookie"

import logo from "../Assests/logo.png"
import "./Home.css"

class Home extends Component {
  state = { notesList: [], title: "", description: "", star: false }

  componentDidMount() {
    this.getNotesData()
  }

  getNotesData = async () => {
    const response = await fetch("http://localhost:4000")
    const data = await response.json()
    console.log(data)
    const responseData = data.data.map((each) => ({
      _id: each._id,
      title: each.title,
      description: each.description,
      createdAt: each.createdAt,
    }))
    this.setState({ notesList: responseData })
  }

  create = async (e) => {
    e.preventDefault()
    const { title, description } = this.state
    const userDetails = { title, description }
    const url = "http://localhost:4000"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    window.location.reload()
  }

  title = (e) => {
    this.setState({ title: e.target.value })
  }

  description = (e) => {
    this.setState({ description: e.target.value })
  }

  deleteNote = async (id) => {
    console.log(id)

    const options = {
      method: "DELETE",
    }
    await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
    })
    window.location.reload()
  }

  starCliked = () => {
    this.setState((pre) => ({ star: !pre.star }))
  }

  logout = () => {
    const { history } = this.props
    Cookies.remove("jwt_token")
    history.replace("/login")
  }

  render() {
    const { notesList, star } = this.state
    return (
      <div className="home-container">
        <div className="navbar-container">
          <div>
            <img src={logo} alt="logo" className="navbar-logo" />
          </div>
          <div>
            <button
              type="button"
              className="logout-button"
              onClick={this.logout}
            >
              Logout
            </button>
          </div>
        </div>
        <ul className="notes-cards-container">
          {notesList.length > 0 ? (
            <>
              {notesList.map((each) => (
                <Popup
                  modal
                  trigger={
                    <li key={each._id} className="notes-card">
                      <h1 className="note-heading">{each.title}</h1>
                      <p>{format(new Date(each.createdAt), "MMMM d yyyy")}</p>
                      <p className="desc">{each.description}</p>
                      <div className="edit-delete-container">
                        <p>
                          <MdDeleteForever size={20} />
                        </p>
                      </div>
                    </li>
                  }
                >
                  {(close) => {
                    return (
                      <div className="popup-container-main2">
                        <div className="popup-container2">
                          <h1 className="cross" onClick={() => close()}>
                            <ImCross />
                          </h1>
                          <div className="box">
                            <div>
                              <h1>{each.title}</h1>
                            </div>
                            <div className="popup-description2">
                              <p>Description: {each.description}</p>
                            </div>
                            <button
                              className="delete"
                              onClick={() => this.deleteNote(each._id)}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  }}
                </Popup>
              ))}
            </>
          ) : (
            <div>
              <h1>Start Planning Your Day!</h1>
              <p>
                Looks like you don’t have any tasks yet. Start adding your plans
                or goals for the day to stay organized and productive!
              </p>
            </div>
          )}
        </ul>
        <div className="add-button-container">
          <div className="create-button">
            <Popup
              modal
              trigger={
                <button type="button" className="plus-button">
                  <FaPlusSquare size={60} />
                </button>
              }
            >
              {(close) => {
                return (
                  <div className="main-popup-container">
                    <div className="popup-container">
                      <h1 className="cross" onClick={() => close()}>
                        <ImCross className="croos" />
                      </h1>
                      <h1 className="heading">Notes</h1>
                      <form className="notes-form" onSubmit={this.create}>
                        <div>
                          <label htmlFor="title">Title</label>
                          <input
                            type="text"
                            placeholder="Title"
                            id="title"
                            className="title"
                            onChange={this.title}
                          />
                        </div>
                        <div>
                          <label htmlFor="Description">Description</label>
                          <textarea
                            type="text"
                            placeholder="Description"
                            id="Description"
                            rows={16}
                            onChange={this.description}
                          />
                        </div>
                        <button type="submit" className="submit-button">
                          Create <FaPlusSquare />
                        </button>
                      </form>
                    </div>
                  </div>
                )
              }}
            </Popup>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
