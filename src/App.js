import React from 'react';
import './style.css';

const playingFieldConfig = [
  null, null, null, 9, null, 8, null, 2, null,
  null, null, 2, null, null, null, null, null, 1,
  null, null, 1, null, null, 2, 4, 6, 9,
  null, null, null, 8, null, null, 5, 9, 7,
  null, null, null, 3, 2, 7, null, 1, null,
  6, 7, null, null, null, 5, null, null, null,
  2, null, null, null, 7, 4, null, 5, 3,
  null, null, null, null, 8, 9, 6, null, null,
  7, 5, null, 2, null, null, 9, 4, null,
  ]

export default function App() {
  return <Game />;
}

class DeleteBox extends React.Component {
  render() {
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

class CheckBox extends React.Component {
  render() {
    return (
      <button
        className="checkbutton"
        style={{ backgroundColor: this.props.bgColor }}
        onClick={this.props.onClick}
      >
        Test
      </button>
    );
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: 'white',
      textColor: 'black'
    };
  }

  render() {
    return (
      <button
        className="square"
        style={{ backgroundColor: this.props.bgColor, color: this.props.textColor }}
        onClick={this.props.onClick}
      >
        {this.props.number}
      </button>
    );
  }
}

class InputSquare extends React.Component {
  render() {
    return (
      <button className="squareright" onClick={this.props.onClick}>
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
      correct: props.correct,
    };
  }

  renderSquare(i) {
    var resColor;

    if (this.props.correct[i] === true) {
      //green
      if (!isGrayArea(i)) {
        resColor = 'rgb(217, 255, 250)' //check colors
      } else {
        resColor = 'rgb(195, 228, 223' //check colors
      }
    }
    else if (this.props.correct[i] === false) {
      if (!isGrayArea(i)) {
        resColor = 'rgb(255, 191, 191)' //check colors
      } else {
        resColor = 'rgb(218, 163, 163)' //check colors
      }
    } else {
      if (!isGrayArea(i)) {
        if (!this.props.selected[i]) {
          resColor = 'white'
        } else {
          resColor = 'rgb(201, 209, 255)' //check colors
        }
      } else {
        if (!this.props.selected[i]) {
          resColor = 'rgb(238, 238, 238)'
        } else {
          resColor = 'rgb(159, 172, 226)' //check colors
        }
      }
    }
    if (playingFieldConfig[i] === null) {
      return (
        <Square
          onClick={() => this.props.onClick(i)}
          textColor='rgb(46, 59, 231)'
          bgColor={resColor}
          number={this.props.squares[i]}
        />
      );
    } else {
      return (
        <Square
          bgColor={resColor}
          number={this.props.squares[i]}
        />
      );
    }
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

  render() {
    const status = 'Soduko (leicht)';

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
        {this.renderRow(8)}
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
    //startwerte für squares legen.
    this.state = {
      squares: playingFieldConfig,
      selected: Array(81).fill(false),
      correct: Array(81).fill(null),
      message: '',
    };
    
  }

  handleClickLeft(i) {
    const squaselected = this.state.selected.slice();
    squaselected[i] = !this.state.selected[i];//flip

    this.setState({
      squares: this.state.squares,
      selected: squaselected,
      correct: Array(81).fill(null),
      message: '',
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
      correct: Array(81).fill(null),
      message: '',
    });
  }

  handleDelClick() {
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
      correct: Array(81).fill(null),
      message: '',
    });
  }

  handleCheckClick() {
    const squares = this.state.squares.slice();
    var message = '';
    //if(checkTotal(squares)) {
    //  message = 'Check'
    //}
    const correct = markTotal(squares);

    this.setState({
      squares: squares,
      selected: Array(81).fill(false),
      correct: correct,
      message: message,
    });
  }

  render() {
    return (
      <div className="game" ref={}>
        <div className="game-board">
          <Board
            squares={this.state.squares}
            selected={this.state.selected}
            correct={this.state.correct}
            onClick={(i) => this.handleClickLeft(i)}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
        <div className="game-board">
          <InputInterface onClick={(i) => this.handleClickRight(i)} />
          <DeleteBox onClick={() => this.handleDelClick()} />
          <CheckBox onClick={() => this.handleCheckClick()} />
          <br/><r>{this.state.message}</r>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol></ol>
        </div>
      </div>
    );
  }
}

function isGrayArea(pos) {
  var rowx = Math.floor(pos/3)%3;
  var rowy = Math.floor(Math.floor((pos/9))/3);
  if (((rowx + rowy) % 2) === 1) {
    return true;
  }
  return false;
}

function getBox(pos) {
  var rowx = Math.floor(pos/3)%3;
  var rowy = Math.floor(Math.floor((pos/9))/3);
  return rowx + 3*rowy;
}

// zwei

function markTotal(squares) {
  var corrected = Array(81).fill(null)
  for (let a = 0; a < 81; a++) {
    corrected[a] = checkCell(squares, a);
  }
  return corrected;
}

function checkCell(squares, cell) {
  if(squares[cell] === null) {
    return false;
  }
  if(!violatesRows(squares, cell) && !violatesColumns(squares, cell) && !violatesBoxes(squares, cell)) {
    return true;
  }
  return false;
}

function violatesRows(squares, cell) {
  var row = Math.floor(cell/9)

  let res = [];
  for (let b = 0; b < 81; b++) {
    if(Math.floor(b/9) === row) {
      res.push(squares[b]);
    }
  }
  if(violatesDoubleInArray(res, squares[cell])) {
    return true;
  }
  return false;
}

function violatesColumns(squares, cell) {
  var col = cell%9;

  let res = [];
  for (let b = 0; b < 81; b++) {
    if(b%9 === col) {
      res.push(squares[b]);
    }
  }
  if(violatesDoubleInArray(res, squares[cell])) {
    return true;
  }
  return false;
}

function violatesBoxes(squares, cell) {
  var box = getBox(cell);

  let res = [];
  for (let b = 0; b < 81; b++) {
    if(getBox(b) === box) {
      res.push(squares[b]);
    }
  }
  if(violatesDoubleInArray(res, squares[cell])) {
    return true;
  }
  return false;
}

function violatesDoubleInArray(squares, value) {
  var counter = 0;
  for(let a = 0; a<9; a++) {
    if(squares[a] === value) {
      counter++;
    }
  }
  if (counter > 1) {
    return true;
  }
  return false;
}
