import { Component, OnInit } from '@angular/core';
import { WaybillService } from '../waybill.service';
import { Waybill, nullFuel } from '../waybill';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit {
  data$ = this.service.getWaybills();
  constructor(
    private service: WaybillService
  ) { }

  ngOnInit() {
  }

  fill(wb: Waybill) { 
    if(notLitres(wb)) {
      wb.notFuel = true;
      wb.fuel = [nullFuel] 
    } else {
      wb.notFuel = false;
      wb.fuel = [{
        liters: getLiter(wb),
        payment: getPayment(wb),
        station: wb.fuelStation,
        date: wb.date,
        comment: "",
        fromCustomer: false
      }] 
    }
    this.service.update(wb).subscribe(() => {
      this.service.loading();
    });
  }
  clear(wb: Waybill) { 
    wb.notFuel = false;
    wb.fuel = [] 
  }
}

function notLitres(wb: Waybill) {
  if(!wb.fuelLitres) return true;
  if(wb.fuelLitres == "") return true;
  if(wb.fuelLitres == "-") return true;
}

function getLiter(wb: Waybill) {
  if(wb.fuelLitres == "") return 0;
  if(wb.fuelLitres == "-") return 0;
  if(wb.fuelLitres == null) return 0;
  return +wb.fuelLitres;
}
function getPayment(wb: Waybill) {
  if(wb.fuelCost == null) return 0;
  return +wb.fuelCost;
}