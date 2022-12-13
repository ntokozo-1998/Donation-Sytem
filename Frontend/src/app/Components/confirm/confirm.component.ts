import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-job',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  statusMes: string | undefined;

statusChangeC() {

  this.statusMes = this.statusMes? this.statusMes : 'On my status';
  if(this.statusMes === 'No status')
  {
    this.statusMes = 'On my status';
  }
}

statusChangeP() {

  this.statusMes = this.statusMes? this.statusMes : 'No status';
  if(this.statusMes === 'On my status')
  {
    this.statusMes = 'No status';
  }
}

}