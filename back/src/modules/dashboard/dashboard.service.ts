import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GET_DASHBOARD_CARDS_DATA } from 'src/queries/dashboard.queries';
import { getConnection, Repository } from 'typeorm';
import { Company } from '../company/entities/company.entity';
import { ContractService } from '../contract/contract.service';
import { Contract } from '../contract/entities/contract.entity';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        @InjectRepository(Contract)
        private contractRepository: Repository<Contract>,
        private contractService: ContractService
    ) { }

    async getDashBoardData(): Promise<any> {
        const contracts: Contract[] = await this.contractRepository.find();
        for (let i = 0; i < contracts.length; i++) {
            const contract = contracts[i];
            await this.contractService.generatePendingDocuments(contract.id);
        }

        const dashboardCardsData: any = (await getConnection().query(GET_DASHBOARD_CARDS_DATA))[0];

        const data: any = {
            totalCompaniesCount: dashboardCardsData.totalCompaniesCount,
            newCompaniesCount: dashboardCardsData.newCompaniesCount,
            totalContractsCount: dashboardCardsData.totalContractsCount,
            newContractsCount: dashboardCardsData.newContractsCount,
            totalRequestedDocumentsCount: dashboardCardsData.totalRequestedDocumentsCount,
            totalApprovedDocumentsCount: dashboardCardsData.totalApprovedDocumentsCount,
            newRequestedDocumentsCount: dashboardCardsData.newRequestedDocumentsCount,
            newApprovedDocumentsCount: dashboardCardsData.newApprovedDocumentsCount,

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
                    data: [65, 15, 45, 65, 15, 45, 65, 15, 45, 65, 15, 0],
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

        return data;
    }
}
