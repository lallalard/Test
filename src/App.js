import React from 'react';
import './style.css';

export default function App() {
  return <Game />;
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      bgColor: 'white',
    };
  }

  render() {
    return (
      <button
        className="square"
        style={{ backgroundColor: this.state.bgColor }}
        onClick={() =>
          this.state.selected
            ? this.setState({ bgColor: 'white', selected: false })
            : this.setState({ bgColor: 'rgb(219, 219, 219)', selected: true })
        }
      >
        {/* TODO */}
      </button>
    );
  }
}

class InputSquare extends React.Component {
  render() {
    return <button className="square">{this.props.value}</button>;
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class InputInterface extends React.Component {
  renderSquare(i) {
    return <InputSquare value={i} />;
  }

  render() {
    const status = 'Eingabe';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="board-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
        <div className="game-board">
          <InputInterface />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
