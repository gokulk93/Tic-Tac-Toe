import { Component,OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Observable, throwError } from 'rxjs';
import {Board} from './board.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

//const board: Array<{id: number, name: any}>
  boardArr  = [" "," "," "," "," "," "," "," "," "];

  
  boardObj = new Board();
  isShow :boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.boardObj.currentBoard = this.boardArr;
    this.isShow = true;
  }

  title = 'tic-tac-toe';
  isDisabled=false;

  clickFunction(user, id) {

    
    // this.isDisabled=true;
    
    var spot = id;
    this.boardArr[spot] = "X";
    
    
    this.boardObj.status = spot;
    this.boardObj.currentBoard = this.boardArr;

    //let index = this.board.indexOf(user);
    // user.name = "X";
    // user.disabled=true;
    this.boardArr[spot] = "X";
    
    this.dataService.playGame(this.boardObj)
      .subscribe(
        data => {
          this.boardObj.status = data.status;
          this.boardArr = data.currentBoard;
          if(this.boardObj.status == "I"){
            alert("Invalid");
          }else if(this.boardObj.status == "X"){
            this.isShow = !this.isShow;
            alert("Player 1 wins");
          }else if(this.boardObj.status == "O"){
            this.isShow = !this.isShow;
            alert("Opponent wins");
          }else if(this.boardObj.status == "D"){
            this.isShow = !this.isShow;
            alert("Match Tie");
          }
          console.log(data.status);
          console.log(data.currentBoard);
      },
      error => {
        console.error("Error playing game!");
        this.isShow = !this.isShow;
        this.reset();
        return Observable.throw(error);
      });
  }


  reset(){
    this.boardArr  = [" "," "," "," "," "," "," "," "," "];
    this.isShow = !this.isShow;
  }
}
