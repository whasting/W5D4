const readlines = require('readline');

const reader = readlines.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.stacks = [[3, 2, 1], [], []];
  }

  promptMove(callback) {
    // print stacks
    let fromTower, toTower;
    // prompt user where they want to move from
    reader.question("What tower would you like to move from? ", (ans) => {
      fromTower = ans;
      // prompt user where they want to move to
      reader.question("What tower would like to move to? ", (ans2) => {
        toTower = ans2;
        callback(fromTower, toTower);
      });
    });
    // move disc callback?
  }

  isValidMove(startTowerIdx, endTowerIdx) {
      // checks for smaller disc on bottom
      // checks that start tower isn't emoty
    if(this.stacks[startTowerIdx].length){
      let startDisc = this.stacks[startTowerIdx][
                      this.stacks[startTowerIdx].length - 1];
      let endDisc = this.stacks[endTowerIdx][
                    this.stacks[endTowerIdx].length - 1];
      if(endDisc === undefined || startDisc < endDisc){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  move (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)){
      let from = this.stacks[startTowerIdx].pop();
      this.stacks[endTowerIdx].push(from);
      return true;
    } else {
      return false;
    }
  }

  isWon() {
    if (this.stacks[1].length === 3 || this.stacks[2].length === 3) {
      return true;
    } else {
      return false;
    }
  }

  print() {
    console.log(JSON.stringify(this.stacks));
  }

  run(completionCallback) {
    this.print();
    this.promptMove( (startTowerIdx, endTowerIdx) => {
      if (this.move(startTowerIdx, endTowerIdx)) {
        if (this.isWon()) {
          completionCallback();
        } else {
          this.run(completionCallback);
        }
      } else {
        console.log('you messed up');
        this.run(completionCallback);
      }
    });
  }
}

const g = new Game();
g.run( () => {
  console.log('CONGRATULATIONS');
  reader.close();
});
