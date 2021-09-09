import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';
import colors from './colors';


function Autor (props) {
  return (
    <div>
      <span id="autor"> {props.autor} </span>
      <a id="tweet-quote" href="https://twitter.com/" target="_blank" rel="noreferrer">
        Tweeter
      </a>
    </div>
  )
}
class Card extends React.Component {
  render () {
    return (
      <div id="quote-box" className="card-div" style={{backgroundColor: this.props.color}} >
        <p id="text">
          {this.props.isquote && <span className="com">"</span>}
          {this.props.quote}
          {this.props.isquote && <span className="com">"</span> }
        </p>
        {this.props.isquote && <Autor autor={this.props.autor} /> }
        <button id="new-quote" className="btn" onClick={this.props.newQuote}>
          Nueva Frase
        </button>
      </div>
    )
  }
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      idxColor: 1,
      quote: 'Hola, para iniciar presiona el boton',
      isquote: false,
      autor: ''
    };
  }

  newQuote = () => {
    axios.get('https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand')      
      .then(response => response.data)
        .then(data => {
          const randomQuote = Math.floor(Math.random() * 10);
          const newIdx = Math.floor(Math.random() * 12);
          this.setState({
            quote: data[randomQuote].content.rendered,
            isquote: true,
            idxColor: newIdx,
            autor: data[randomQuote].title.rendered,
          });
        });
  }

  render () {
    const PRIMARY = colors[this.state.idxColor].primary;
    const SECOND = colors[this.state.idxColor].second;

    return (
      <div className="div" style={{backgroundColor: PRIMARY}} >
        <Card
          color={SECOND}
          newQuote={this.newQuote}
          isquote={this.state.isquote}
          quote={this.state.quote}
          autor={this.state.autor}
        />
      </div>
    )
  }
}

ReactDOM.render (
  <App />,
  document.getElementById('root')
);