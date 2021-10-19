import React from 'react';
import './style.css';

export default function App() {
  return <Game />;
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: this.props.selectedColor? 'red' : 'green',
    };
    this.onClick2 = this.onClick2.bind(this);
  }

  onClick2(event) {
    //this.props.onClick();
    () => {this.setState({bgColor:'white'}) };
  }

  render() {
    return (
      <button
        className="square"
        style={{ backgroundColor: this.state.bgColor}}
        //onClick={() => {this.props.onClick(), () => {this.setState({bgColor:'white'})} } }
        //onClick={() => {this.setState({bgColor:'white'}) } }
        onClick={this.onClick2}
      >
        {this.props.selectedColor? 'a' : 'b'}
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
  constructor(props) {
    super(props);
    this.state = {
      squares: props.squares,
      selected: props.selected,
    };
  }

  renderSquare(i) {
    return (
      <Square
        onClick={() => this.props.onClick(i)}
        selectedColor={this.props.selected[i]}
      />
    );
  }

  //onClick={(i) => this.handleClickLeft(i)

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
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      selected: Array(9).fill(false),
    };
  }

  handleClickLeft(i) {
    const marked = this.state.selected[i];
    const squaselected = this.state.selected.slice();
    squaselected[i] = !marked[i]; //flip

    this.setState({
      squares: this.state.squares,
      selected: squaselected,
    });
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            selected={this.state.selected}
            onClick={(i) => this.handleClickLeft(i)}
          />
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
