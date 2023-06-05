import { Component } from '@angular/core';

@Component({
  selector: 'app-hash-game',
  templateUrl: './hash-game.component.pug',
  styleUrls: ['./hash-game.component.scss']
})
export class HashGameComponent {

  hash = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  playerXScore = 0;
  playerOScore = 0;
  private blocked = false;

  private playerType = 1;

  constructor() {
  }

  playerPlays(row: number, column: number): void {
    if (this.hash[row][column] === 0 && !this.blocked) {
      this.hash[row][column] = this.playerType;
      this.blocked = true;

      if (this.playerWin()) {
        setTimeout(() => this.restartHash(), 500);
        return;
      }

      if (this.checkDraw()) {
        setTimeout(() => this.restartHash(), 500);
        return;
      }

      this.changePlayerTime();
    }
  }

  displayFormatter(value: number): string {
    switch (value) {
      case 1:
        return 'X';
      case 2:
        return 'O';
      default:
        return '';
    }
  }

  restartScore(): void {
    this.playerOScore = 0;
    this.playerXScore = 0;
  }

  restartHash(): void {
    this.hash = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    this.blocked = false;
  }

  private checkDraw(): boolean {
    let count = 0;

    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (this.hash[row][column] !== 0) {
          count++;
        }
      }
    }

    return count === 9;
  }

  private checkWinByRow(): boolean {
    for (let row = 0; row < 3; row++) {
      let repeatCount = 0;
      for (let column = 0; column < 3; column++) {
        if (this.hash[row][column] === this.playerType) {
          repeatCount++

          if (repeatCount === 3) {
            return true;
          }
        }
      }
    }

    return false;
  }

  private checkWinByColumn(): boolean {
    for (let column = 0; column < 3; column++) {
      let repeatCount = 0;

      for (let row = 0; row < 3; row++) {
        if (this.hash[row][column] === this.playerType) {
          repeatCount++

          if (repeatCount === 3) {
            return true;
          }
        }
      }
    }

    return false;
  }

  private checkWinByDiagonal(): boolean {
    let repeatCountDiagonal1 = 0;
    let repeatCountDiagonal2 = 0;

    for (let i = 0; i < 3; i++) {
      if (this.hash[i][i] == this.playerType) {
        repeatCountDiagonal1++

        if (repeatCountDiagonal1 === 3) {
          return true
        }
      }

      if (this.hash[i][2 - i] === this.playerType) {
        repeatCountDiagonal2++

        if (repeatCountDiagonal2 == 3) {
          return true
        }
      }
    }

    return false
  }

  private playerWin(): boolean {
    if (this.checkWinByRow() || this.checkWinByColumn() || this.checkWinByDiagonal()) {
      if (this.playerType === 1) {
        this.playerXScore++;
      } else {
        this.playerOScore++;
      }

      return true;
    }

    return false;
  }

  private changePlayerTime(): void {
    if (this.playerType === 1) {
      this.playerType = 2;
      this.blocked = false;
    } else {
      this.playerType = 1;
      this.blocked = false;
    }
  }

}
