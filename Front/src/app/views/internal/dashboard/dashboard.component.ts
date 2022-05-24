import { Component, Input, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
import { zerosLeft } from 'src/app/tools/helpers/math.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  zerosLeft = zerosLeft;

  backgroundColor = [
    "#00be32",
    "#ff9100",
    "#dc3546"
  ];

  dashboardData: any;
  options: any;

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getDashboardData().pipe(
      map((dashboardData) => {
        this.dashboardData = dashboardData;
      })
    ).subscribe();

    this.options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          align: "bottom"
        }
      }
    };
  }

  ngOnInit(): void {
  }

}
