import React, { Component } from "react";
import Spinner from "../layout/Spinner";

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
      return <h1>Data returned</h1>;
    }
  }
}

export default Lyrics;
