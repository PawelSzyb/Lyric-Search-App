import React, { Component } from "react";
import { Consumer } from "../../context";

export class Search extends Component {
  state = {
    title: ""
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandle = (dispatch, e) => {
    e.preventDefault();

    fetch(
      ` https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
        this.state.title
      }&page=1&page_size=10&s_track_rating=desc&apikey=${
        process.env.REACT_APP_MM_KEY
      }`
    )
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.message.body.track_list
        });
        this.setState({ title: "" });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" /> Search For A Song
              </h1>
              <div className="lead text-center">Get lyrics for any song.</div>
              <form
                onSubmit={this.onSubmitHandle.bind(this, dispatch)}
                className="form-group"
              >
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Song title ..."
                  name="title"
                  value={this.state.title}
                  onChange={this.onInputChange}
                />
                <button
                  className="btn btn-primary btn-lg btn-block mt-3 mb-5"
                  type="submit"
                >
                  Get Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
