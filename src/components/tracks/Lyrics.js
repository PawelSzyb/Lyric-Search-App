import React, { Component } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };
  componentDidMount() {
    fetch(
      ` https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
        this.props.match.params.id
      }&apikey=${process.env.REACT_APP_MM_KEY}`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({ lyrics: res.message.body.lyrics });
        return fetch(
          ` https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => res.json())
      .then(res => this.setState({ track: res.message.body.track }))
      .catch(err => console.log(err));
  }
  render() {
    const { track, lyrics } = this.state;
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
            <ul className="list-group mt-3 mb-3">
              <li className="list-group-item">
                <strong>Album ID</strong>: {track.album_id}
              </li>
              <li className="list-group-item">
                <strong>Song Genre</strong>:{" "}
                {
                  track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                }
              </li>
              <li className="list-group-item">
                <strong>Explicit Words: </strong>
                {track.explicit === 0 ? "No" : "Yes"}
              </li>
              <li className="list-group-item">
                <strong>Release Date</strong>:{" "}
                <Moment format="DD/MM/YY">{track.first_release_date}</Moment>
              </li>
            </ul>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
