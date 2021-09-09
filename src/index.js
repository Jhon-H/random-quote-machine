import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';
import colors from './colors';

class Card extends React.Component {
  render () {
    return (
      <div className="card-div" style={{backgroundColor: this.props.color}} >
        <p>
          {this.props.isquote && <span className="com">"</span>}
          {this.props.quote}
          {this.props.isquote && <span className="com">"</span> }
        </p>
        <button className="btn" onClick={this.props.newQuote}> Nueva Frase</button>
      </div>
    )
  }
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      idxColor: 0,
      quote: 'Hola, para iniciar presiona el boton',
      isquote: false,
    };
  }
  
  newQuote = () => {
    axios.get('https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand')      
      .then(response => response.data)
        .then(data => {
          const randomQuote = Math.floor(Math.random() * 10);
          const newIdx = Math.floor(Math.random() * 9);
          this.setState({
            quote: data[randomQuote].content.rendered,
            isquote: true,
            idxColor: newIdx
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
        />
      </div>
    )
  }
}

ReactDOM.render (
  <App />,
  document.getElementById('root')
);