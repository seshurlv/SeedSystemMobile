import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ObservationsPage } from '../../pages/observations/observations'

import { CallNumber } from '@ionic-native/call-number';

import { GrowerDetailsPage } from '../../pages/grower-details/grower-details'

import { ModalController } from 'ionic-angular';
import { authService } from '../../services/authService';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'inspections.html',
})
export class inspectionsPage {

  showFarmer
  EPA
  showGrowers
  showvillages
  selecedGrower
  currentDate
  section
  itemCompleted
  growers = []



  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber,
    public modalCtrl: ModalController,private authservice: authService) {
    this.currentDate = new Date().getTime()
    console.log(this.currentDate)
  }

  GrowerDetails(grower) {
    this.navCtrl.push(GrowerDetailsPage, {
      grower: grower
    })
    // let modal = this.modalCtrl.create(GrowerDetailsPage,{
    //   grower:grower
    // });
    // modal.present();
  }

  ngOnInit() {
    console.log('ngOnINit')
    let role = window.localStorage.getItem('Role')
    let UserID = window.localStorage.getItem('UserID')
    let mode = 1
    console.log(role)
    console.log(UserID)


    this.authservice.GetRegistrationsByUser(mode,UserID)
    .subscribe(res => {
      console.log(JSON.stringify(res))
      this.growers = res
      //this.newGrowers = this.growers

      this.newGrowers = this.growers.filter((grower) => {
        console.log(grower.Status)
        return grower.Status == 'Assigned'
      })

    })
  }


  newGrowers = []

  searchAsync(ev) {

    let val = ev.target.value;
    
    if ( val.trim() != '') {
      console.log('search event value ' + val)
      
      this.newGrowers = this.newGrowers.filter((grower) => {
        console.log('search filter ' + JSON.stringify(grower))
        return (grower.GrowerName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      console.log('else ' + val)
      console.log('else ' +  this.itemCompleted)
     // this.newGrowers = this.newGrowers

      if(this.itemCompleted){
        this.newGrowers = this.growers.filter((grower) => {
          console.log(grower.Status)
          return grower.Status == 'Inspected'
        })
      }else{
        this.newGrowers = this.growers.filter((grower) => {
          console.log(grower.Status)
          return grower.Status == 'Assigned'
        })
      }
    }
  }

  updateItem(status){
    console.log(status)
    if(status){
      this.newGrowers = this.growers.filter((grower) => {
        console.log(grower.Status)
        return grower.Status == 'Inspected'
      })
    }else{
      //this.newGrowers = this.growers
      this.newGrowers = this.growers.filter((grower) => {
        console.log(grower.Status)
        return grower.Status == 'Assigned'
      })
    }
  }





  searchGrower() {

    this.showFarmer = true;
  }

  inspectNow(crop,classOfSeed,Variety,regId) {
    console.log(regId)
    console.log(Variety)
    console.log(crop)
    console.log(classOfSeed)
    this.navCtrl.push(ObservationsPage,{
      growerCrop:crop,
      classOfSeed:classOfSeed,
      variety:Variety,
      regId:regId 
    })
  }

  selectedDistrict(event) {

    this.section = true;
  }
  selectedsection(event) {
    this.EPA = true;
  }

  selectedEPA(event) {
    this.showvillages = true;
  }

  selectedVillage(event) {
    this.showGrowers = true;

  }
  selectedGrower(event) {
    this.selecedGrower = true;
  }

  // call() {
  //   this.callNumber.callNumber("2651772428", true)
  //     .then(() => console.log('Launched dialer!'))
  //     .catch(() => console.log('Error launching dialer'));

  // }

}
