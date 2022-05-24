import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  data: any = {
    totalCompaniesCount: 7,
    newCompaniesCount: 1,
    totalContractsCount: 12,
    newContractsCount: 2,
    totalRequestedDocumentsCount: 115,
    totalApprovedDocumentsCount: 98,
    newRequestedDocumentsCount: 48,
    newApprovedDocumentsCount: 27,

    lastMonthOverview: {
      labels: [''],
      datasets: [{
        label: 'Aprovados',
        data: [65],
        backgroundColor: ["#00be32"]
      },
      {
        label: 'Em Análise',
        data: [27],
        backgroundColor: ["#ff9100"]
      },
      {
        label: 'Não Enviados',
        data: [9],
        backgroundColor: ["#dc3546"]
      }]
    },

    last12MonthsOverview: {
      labels: ['Jan/2022', 'Fev/2022', 'Mar/2022', 'Abr/2022', 'Maio/2022', 'Jun/2022', 'Jul/2022', 'Ago/2022', 'Set/2022', 'Out/2022', 'Nov/2022', 'Dez/2022'],
      datasets: [{
        label: 'Aprovados',
        data: [65, 15, 45, 65, 15, 45, 65, 15, 45, 65, 15, 45],
        backgroundColor: ["#00be32"]
      },
      {
        label: 'Em Análise',
        data: [27, 10, 12, 27, 10, 12, 27, 10, 12, 27, 10, 12],
        backgroundColor: ["#ff9100"]
      },
      {
        label: 'Não Enviados',
        data: [9, 2, 4, 9, 2, 4, 9, 2, 4, 9, 2, 4],
        backgroundColor: ["#dc3546"]
      }]
    }
  }

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
    const url = '/api/dashboard';
    return this.http.get<any>(url);
  }
}
