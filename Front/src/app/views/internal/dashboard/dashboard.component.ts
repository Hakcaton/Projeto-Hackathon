import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { zerosLeft } from 'src/app/tools/helpers/math.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  zerosLeft = zerosLeft;


  dashboardData: any = {
    totalCompaniesCount: 7,
    newCompaniesCount: 1,
    totalContractsCount: 12,
    newContractsCount: 2,
    totalRequestedDocumentsCount: 115,
    totalApprovedDocumentsCount: 98,
    newRequestedDocumentsCount: 48,
    newApprovedDocumentsCount: 27
  }

  totalDocumentsData: any;
  newDocumentsData: any;
  options: any;

  constructor() {
    this.totalDocumentsData = {
      labels: ['Solicitados', 'Aprovados', 'Pendentes'],
      datasets: [
        {
          data: [this.dashboardData.totalRequestedDocumentsCount, this.dashboardData.totalApprovedDocumentsCount, this.dashboardData.totalRequestedDocumentsCount - this.dashboardData.totalApprovedDocumentsCount],
          backgroundColor: [
            "#FFCE56",
            "#36A2EB",
            "#FF6384"
          ],
          hoverBackgroundColor: [
            "#FFCE56",
            "#36A2EB",
            "#FF6384"
          ]
        }
      ]
    };

    this.newDocumentsData = {
      labels: ['Solicitados', 'Aprovados', 'Pendentes'],
      datasets: [
        {
          data: [this.dashboardData.newRequestedDocumentsCount, this.dashboardData.newApprovedDocumentsCount, this.dashboardData.newRequestedDocumentsCount - this.dashboardData.newApprovedDocumentsCount],
          backgroundColor: [
            "#FFCE56",
            "#36A2EB",
            "#FF6384"
          ],
          hoverBackgroundColor: [
            "#FFCE56",
            "#36A2EB",
            "#FF6384"
          ]
        }
      ]
    };

    this.options = {
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
