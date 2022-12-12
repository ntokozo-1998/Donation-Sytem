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

  this.statusMes = this.statusMes? this.statusMes : 'Completed';
  if(this.statusMes === 'In Progress')
  {
    this.statusMes = 'Completed';
  }
}

statusChangeP() {

  this.statusMes = this.statusMes? this.statusMes : 'In Progress';
  if(this.statusMes === 'Completed')
  {
    this.statusMes = 'In Progress';
  }
}

}