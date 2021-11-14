import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameHelperService} from '../../../services/game-helper.service';
import {GameHubService} from '../../../services/game-hub.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TicTacToeCellModel} from '../../../models/tic-tac-toe-cell.model';

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
    })
  }

  initializeGrid(): void {
    Array(9).fill(null).forEach((_, index) => {
      this.gameGrid.push({
        cellPosition: index,
        storedChar: ''
      });
    });
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }

  move(position: number): void {
    const actualMove: number = this.willBeTheRightMove(position);
    const requestedCell = this.gameGrid.find((cell) => cell.cellPosition === actualMove);
    if (requestedCell?.storedChar || requestedCell?.storedChar.length) {
      // implement move
    }
  }

  private willBeTheRightMove(requestedCell: number): number {
    const willItBe = Math.floor(Math.random() * 101) + 1;
    if (!this.currentRandomness || willItBe >= this.currentRandomness) {
      return requestedCell;
    }
    return this.isNotTheRightMove(requestedCell);
  }

  private isNotTheRightMove(requestedCell: number): number {
    if (this.gameGrid.filter(({ storedChar }) => !storedChar || !storedChar.length).length === 1) {
      return requestedCell;
    }

    let isItEmpty: boolean = false;
    let potentialResponse: number = 0;

    while (isItEmpty) {
      potentialResponse = Math.floor(Math.random() * 9);
      const cellRef = this.gameGrid[potentialResponse].storedChar;
      isItEmpty = (!cellRef || !cellRef.length) && (potentialResponse !== requestedCell);
    }
    return potentialResponse;
  }

  private checkIfDraw(): boolean {
    return !this.gameGrid.some(({storedChar}) => !storedChar || !storedChar.length);
  }

  ngOnDestroy(): void {

  }

}
