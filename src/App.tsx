import { FC, useEffect, useState } from "react";
import './App.css';
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";

// todo: имплементировать шаг короля
// todo: имплементировать шаги пешки 
//       (если враг будет перед пешкой, которая ни разу не ходила,
//          она может использовать два шага и перескачить врага)
// todo: имплементировать функцию "Шах и мат"
// todo: имплементировать функцию "История ходов"
// todo: имплементировать окончание игры по истечению таймера и по съеданию короля
// todo: имплементировать ввод кастомного таймера
// todo: имплементировать приятный интерфейс

// На потом:
// todo: имплементировать процесс игры для двух пользователей
//       с помощью SignalR
// todo: имплементировать аутентификацию (необязательно)

const App: FC = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, [])

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    console.log(currentPlayer);
  }

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  return (
    <div className="app">
      <Timer
        currentPlayer={currentPlayer}
        restart={restart}
      />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures title="Черные фигуры" figures={board.lostBlackFigures}/>
        <LostFigures title="Белые фигуры" figures={board.lostWhiteFigures}/>
      </div>
    </div>
  );
};

export default App;