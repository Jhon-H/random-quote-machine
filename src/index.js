import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';

class Card extends React.Component {
  constructor (props) {
    super(props);
    this.state = { quote: '' };
  }

  newQuote = () => {
    axios.get('https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand')
      .then(response => response.content)
        .then(response => {
          this.setState({quote: response})
        });
  }

  render () {
    return (
      <>
        <h3> {this.state.quote} </h3>
        <button onClick={this.newQuote}> Hola </button>
      </>
    )
  }
}

ReactDOM.render (
  <div className="div"> <Card /> </div>,
  document.getElementById('root')
);
