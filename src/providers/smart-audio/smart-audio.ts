import { NativeAudio } from '@ionic-native/native-audio';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()

export class SmartAudio {

  audioType: string = 'html5';
  sounds: any = [];

  constructor(public NativeAudio: NativeAudio, platform: Platform) {
    if(platform.is('cordova')){
      this.audioType = 'native';
    }
  }
/*
  load(){
    this.nativeAudio.preloadSimple('uniqueId1', 'path/to/file.mp3').then(onSuccess, onError);
  );

  play() {
    this.nativeAudio.play('uniqueId1').then(onSuccess, onError);
  }
*/
}
