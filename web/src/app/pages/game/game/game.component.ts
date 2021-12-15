import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameHelperService} from '../../../services/game-helper.service';
import {GameHubService} from '../../../services/game-hub.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TicTacToeCellModel} from '../../../models/tic-tac-toe-cell.model';
import {Subscription} from 'rxjs';
import {MoveModel} from '../../../models/move.model';
import {PlayerModel} from '../../../models/player.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  gameId: string = '';
  opponentName: string = '';
  playerName: string = '';
  isYourTurn: boolean = true;
  isConnected: boolean = true;
  hasSomeoneWon: boolean = false;
  currentRandomness: number = 0;
  playerSymbol: string = '';
  opponentHasDisconnected?: string;

  connectionStateSubscription!: Subscription;
  hasExitedSubscription!: Subscription;
  restartMatchSubscription!: Subscription;
  moveSubscription!: Subscription;
  receiveOpponentSubscription!: Subscription;


  gameGrid: TicTacToeCellModel[] = [];

  constructor(private gameHelperSrv: GameHelperService,
              private gameHubSrv: GameHubService,
              private route: ActivatedRoute,
              private router: Router) {
    this.initializeGrid();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameId = params['gameId'];
    });

    this.connectionStateSubscription = this.gameHubSrv.connectionState$.subscribe((res: boolean) => {
      this.isConnected = res;
      this.gameHubSrv.sendInitialCall(this.gameId, this.playerName, this.currentRandomness);
    });

    this.hasExitedSubscription = this.gameHubSrv.hasExited$.subscribe((res: string) => {
      this.opponentHasDisconnected = res;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2500);
    })

    this.restartMatchSubscription = this.gameHubSrv.restartMatch$.subscribe(() => {
      this.initializeGrid();
      const hasStarted: boolean = this.gameHelperSrv.getHasStartedStatus();
      this.isYourTurn = !hasStarted;
      this.gameHelperSrv.setGameHasStarted(!hasStarted);
      this.gameHelperSrv.setRandomnessValue(this.playerName);
      this.currentRandomness = this.gameHelperSrv.getCurrentRandomness();
    });

    this.moveSubscription = this.gameHubSrv.move$.subscribe((res: MoveModel) => {
      this.gameGrid[res.position].storedChar = res.symbol;
      this.isYourTurn = res.symbol !== this.playerSymbol;
      this.hasSomeoneWon = this.gameHelperSrv.hasSomeoneWon(this.gameGrid);
      if (this.checkIfDraw()) {
        this.hasSomeoneWon = true;
      }
    });

    this.receiveOpponentSubscription = this.gameHubSrv.receivedOpponent$.subscribe((res: PlayerModel) => {
      if (this.playerName !== res.username && (!this.opponentName && !this.opponentName.length)) {
        this.opponentName = res.username;
        this.gameHubSrv.sendInitialCall(this.gameId, this.playerName, this.currentRandomness);
      }
    });

    this.playerName = this.gameHelperSrv.storedUserName;
    this.currentRandomness = this.gameHelperSrv.storedRandomFactor;

    const hasStarted = this.gameHelperSrv.getHasStartedStatus();
    this.playerSymbol = hasStarted ? 'O' : 'X';
    this.isYourTurn = hasStarted;

    if (!this.playerName || !this.playerName.length) {
      this.router.navigate(['/']);
    }

    this.gameHubSrv.connect();
  }

  initializeGrid(): void {
    this.gameGrid = Array(9).fill(null).map((_, index) => {
      return {
        cellPosition: index,
        storedChar: ''
      };
    });
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }

  move(position: number): void {
    if (this.isYourTurn || !this.hasSomeoneWon) {
      const actualMove: number = this.willBeTheRightMove(position);
      const requestedCell = this.gameGrid.find((cell) => cell.cellPosition === actualMove);
      if (requestedCell?.storedChar === '') {
        this.gameHubSrv.move(this.gameId, requestedCell.cellPosition, this.playerSymbol);
      }
    }
  }

  private willBeTheRightMove(requestedCell: number): number {
    const willItBe = Math.floor(Math.random() * 101) + 1;
    
    if (this.currentRandomness === 0 || willItBe >= this.currentRandomness) {
      return requestedCell;
    }

    return this.isNotTheRightMove(requestedCell);
  }

  private isNotTheRightMove(requestedCell: number): number {
    if (this.gameGrid.filter(({ storedChar }) => storedChar.length === 0).length === 1) {
      return requestedCell;
    }

    let isItEmpty: boolean = false;
    let potentialResponse: number = 0;

    while (!isItEmpty) {
      potentialResponse = Math.floor(Math.random() * 9);
      const cellRef = this.gameGrid[potentialResponse].storedChar;
      isItEmpty = cellRef.length === 0 && potentialResponse !== requestedCell;
      
    }
    return potentialResponse;
  }

  private checkIfDraw(): boolean {
    return !this.gameGrid.some(({storedChar}) => storedChar.length === 0);
  }

  rematch(): void {
    this.gameHubSrv.rematch(this.gameId);
  }

  ngOnDestroy(): void {
    try {
      this.gameHubSrv.removeFromGroup(this.gameId);
      this.gameHubSrv.disconnect();
    } catch {
      this.gameHubSrv.disconnect();
      this.router.navigate(['/']);
    }
    if (this.connectionStateSubscription) {
      this.connectionStateSubscription.unsubscribe();
    }
    if (this.hasExitedSubscription) {
      this.hasExitedSubscription.unsubscribe();
    }
    if (this.restartMatchSubscription) {
      this.receiveOpponentSubscription.unsubscribe();
    }
    if (this.moveSubscription) {
      this.moveSubscription.unsubscribe();
    }
    if (this.receiveOpponentSubscription) {
      this.receiveOpponentSubscription.unsubscribe();
    }
  }

}
