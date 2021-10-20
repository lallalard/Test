import React from 'react';
import './style.css';

export default function App() {
  return <Game />;
}

class DeleteBox extends React.Component {
  render() {
    //const color = this.props.selected ? 'white' : 'rgb(224, 224, 224)';
    //this.setState({bgColor: color});
    return (
      <button
        className="delbutton"
        style={{ backgroundColor: this.props.bgColor }}
        onClick={this.props.onClick}
      >
        Del
      </button>
    );
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: 'white',
    };
  }

  render() {
    //const color = this.props.selected ? 'white' : 'rgb(224, 224, 224)';
    //this.setState({bgColor: color});
    return (
      <button
        className="square"
        style={{ backgroundColor: this.props.bgColor }}
        //  onClick={() => {
        //    this.setState({
        //      bgColor: color,
        //    }),
        //      this.props.onClick();
        //  }}
        //onClick={() => {this.setState({bgColor:'white'}) } }
        onClick={this.props.onClick}
        //onClick={() =>{this.props.onClick()}}
      >
        {this.props.number}
      </button>
    );
  }
}

class InputSquare extends React.Component {
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
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
        bgColor={!this.props.selected[i] ? 'white' : 'rgb(224, 224, 224)'}
        number={this.props.squares[i]}
      />
    );
  }

  renderRow(i) {
    let row = []
    for (let a = 0; a < 9; a++) {
      row.push(this.renderSquare((i*9)+a))
    }
    return (
      <div className="board-row">
          {row}
      </div>
    );
  }

  //onClick={(i) => this.handleClickLeft(i)

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
        {this.renderRow(3)}
        {this.renderRow(4)}
        {this.renderRow(5)}
        {this.renderRow(6)}
        {this.renderRow(7)}
        {this.renderRow(7)}
      </div>
    );
  }
}

class InputInterface extends React.Component {
  renderSquare(i) {
    return <InputSquare value={i} onClick={() => this.props.onClick(i)} />;
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
    const squaselected = this.state.selected.slice();
    squaselected[i] = !this.state.selected[i]; //flip

    this.setState({
      squares: this.state.squares,
      selected: squaselected,
    });
  }

  handleClickRight(i) {
    const squares = this.state.squares.slice();
    const squaselected = this.state.selected.slice();
    for (let a = 0; a < squaselected.length; a++) {
      if (squaselected[a]) {
        squaselected[a] = false;
        squares[a] = i;
      }
    }

    this.setState({
      squares: squares,
      selected: squaselected,
    });
  }

  handleDelClick(i) {
    const squares = this.state.squares.slice();
    const squaselected = this.state.selected.slice();
    for (let a = 0; a < squaselected.length; a++) {
      if (squaselected[a]) {
        squaselected[a] = false;
        squares[a] = null;
      }
    }

    this.setState({
      squares: squares,
      selected: squaselected,
    });
  }

  render() {
    return (
      <div className="game" ref={}>
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
          <InputInterface onClick={(i) => this.handleClickRight(i)} />
          <DeleteBox onClick={(i) => this.handleDelClick(i)} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
