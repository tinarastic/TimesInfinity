import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  numA: number = 6;
  numB: number = 6;
  answer: number = 36;
  message: string;
  points: number = 0;
  timer: number;
  timerStartValue: number = 104;
  continueToCountDown: boolean;
  count: number = 3;
  shouldHide: boolean;
  butts: number[] = [1,2,3,4,5,6,7,8,9];
  tables: number = 3;
  tablesIncreaseInterval: number = 5;
  increaseCounter: number = 0;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public statusBar: StatusBar) {
    this.timer = this.timerStartValue;
    statusBar.hide();

  }

  startGame(){
    this.count = 3;
    this.points = 0;
    this.setEquation();
    this.shouldHide = true;
  }

  nextEquation(){
    this.continueToCountDown = false;
    if (this.count < 2) {
      this.gameOver();
      this.shouldHide = false;
    } else {
      this.count = this.count - 1;
      this.pauseForMessage('Next equation ..');
    }

  }

  setEquation(){

    this.clear();
    this.numA = this.getRandomNumber(this.numA);
    this.numB = this.getRandomNumber(this.numB);
    this.timer = this.timerStartValue;
    this.continueToCountDown = true;
    this.countdown();

  }

  getRandomNumber(oldNumber){
    let newNumber = Math.floor((Math.random() * this.tables) + 1);
    if(oldNumber == newNumber) {
      newNumber = this.getRandomNumber(oldNumber)
    };
    return newNumber;
  }

  toggleEasy(){
    if(this.timerStartValue == 104) {
      this.timerStartValue = 304;
    } else {
      this.timerStartValue = 304;
    }
    this.timer = this.timerStartValue;
  }

  countdown(){
    this.timer = this.timer - 1;
    if(this.timer < 1) {
      this.timeOut();
    } else {
      if(this.continueToCountDown) {
        setTimeout(() => {
          if (this.timer > 0) {
            this.countdown();
          }
        }, 100);
      }
    }

  }

  timeOut(){
    this.count = this.count - 1;
    if(this.count != 0) {

      let wrongAnswer = new Audio('../../assets/audio/WrongAnswer.wav');
      wrongAnswer.play();

      this.pauseForMessage('It is ' + (this.numA * this.numB));
    } else {
      this.gameOver();
      this.shouldHide = false;
    }
  }

  clear(){
    delete this.answer;
    this.message = '';
  }

  pauseForMessage(message){
    this.message = message;
    setTimeout(() => {
      this.setEquation();
    }, 2000);
  }

  buttonPressed(event,item) {

    /**
     * Set the numbers entered through the keypad as the answer
     */
    if(this.answer > 99){
      return;
    } else if(this.answer) {
      this.answer = this.answer * 10 + item;
    } else {
      this.answer = item;
    }

    /**
     * If the answer is correct then add points, show message, stop countdown, start again after x seconds
     */
    if(this.answer == (this.numA * this.numB)) {

      let correctAnswer = new Audio('../../assets/audio/CorrectAnswer.mp3');
      correctAnswer.play();

      this.increaseCounter++;
      if(this.increaseCounter == this.tablesIncreaseInterval) {
        this.tables++;
        this.increaseCounter = 0;
      }

      let ratioLeft = this.timer / this.timerStartValue;
      this.points = this.points + Math.floor(ratioLeft * 50);
      this.continueToCountDown = false;
      this.pauseForMessage('Correct!');
    }
  }

  gameOver() {
    let wrongAnswer = new Audio('../../assets/audio/WrongAnswer.wav');
    wrongAnswer.play();
    let alert = this.alertCtrl.create({
      title: 'Game Over!',
      subTitle: 'Your total score is ' + this.points + '!',
      buttons: ['OK']
    });
    alert.present();
  }

}
