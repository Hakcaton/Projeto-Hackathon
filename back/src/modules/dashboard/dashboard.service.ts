import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SELECT_DASHBOARD_CARDS_DATA, SELECT_LAST_12MONTHS_DOCUMENTS_OVERVIEW, SELECT_LAST_30DAYS_DOCUMENTS_OVERVIEW } from 'src/queries/dashboard.queries';
import { getConnection, LessThan, Repository } from 'typeorm';
import { Company } from '../company/entities/company.entity';
import { ContractService } from '../contract/contract.service';
import { Contract } from '../contract/entities/contract.entity';
import { Document } from '../document/entities/document.entities';
import { addDays, addMonths, diffDays, MonthToString } from 'src/tools/helpers/date.helper';
import { eDocumentStatus } from 'src/tools/enum/document-status.definition';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        @InjectRepository(Contract)
        private contractRepository: Repository<Contract>,
        @InjectRepository(Document)
        private documentRepository: Repository<Document>,
        private contractService: ContractService
    ) { }

    async getLast30DaysDocumentsOverview(): Promise<any> {
        const documents: any[] = await getConnection().query(SELECT_LAST_30DAYS_DOCUMENTS_OVERVIEW);
        const last30DaysOverview = {
            labels: [MonthToString(new Date().getMonth()) + '/' + new Date().getFullYear()],
            datasets: [{
                label: 'Aprovados',
                data: [documents.filter((doc) => { return doc.status == eDocumentStatus.approved }).length],
                backgroundColor: ["#00be32"]
            },
            {
                label: 'Em Análise',
                data: [documents.filter((doc) => { return doc.status == eDocumentStatus.under_analysis }).length],
                backgroundColor: ["#ff9100"]
            },
            {
                label: 'Não Enviados',
                data: [documents.filter((doc) => { return doc.status == eDocumentStatus.new || doc.status == eDocumentStatus.invalid }).length],
                backgroundColor: ["#dc3546"]
            }]
        };
        return last30DaysOverview;
    }

    async getLast12MonthsDocumentsOverview(): Promise<any> {
        const documents: any[] = await getConnection().query(SELECT_LAST_12MONTHS_DOCUMENTS_OVERVIEW);

        const last12MonthsOverview = {
            labels: [
                MonthToString(addMonths(new Date(), -11).getMonth(), true) + '/' + new Date().getFullYear(),
                MonthToString(addMonths(new Date(), -10).getMonth(), true) + '/' + new Date().getFullYear(),
                MonthToString(addMonths(new Date(), -9).getMonth(), true) + '/' + new Date().getFullYear(),
                MonthToString(addMonths(new Date(), -8).getMonth(), true) + '/' + new Date().getFullYear(),
                MonthToString(addMonths(new Date(), -7).getMonth(), true) + '/' + new Date().getFullYear(),
                MonthToString(addMonths(new Date(), -6).getMonth(), true) + '/' + new Date().getFullYear(),
                MonthToString(addMonths(new Date(), -5).getMonth(), true) + '/' + new Date().getFullYear(),
                MonthToString(addMonths(new Date(), -4).getMonth(), true) + '/' + new Date().getFullYear(),
                MonthToString(addMonths(new Date(), -3).getMonth(), true) + '/' + new Date().getFullYear(),
                MonthToString(addMonths(new Date(), -2).getMonth(), true) + '/' + new Date().getFullYear(),
                MonthToString(addMonths(new Date(), -1).getMonth(), true) + '/' + new Date().getFullYear(),
                MonthToString(new Date().getMonth()) + '/' + new Date().getFullYear()
            ],
            datasets: [{
                label: 'Aprovados',
                data: [
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.approved) && (doc.request_date.getMonth() == addMonths(new Date(), -11).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -11).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.approved) && (doc.request_date.getMonth() == addMonths(new Date(), -10).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -10).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.approved) && (doc.request_date.getMonth() == addMonths(new Date(), -9).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -9).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.approved) && (doc.request_date.getMonth() == addMonths(new Date(), -8).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -8).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.approved) && (doc.request_date.getMonth() == addMonths(new Date(), -7).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -7).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.approved) && (doc.request_date.getMonth() == addMonths(new Date(), -6).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -6).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.approved) && (doc.request_date.getMonth() == addMonths(new Date(), -5).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -5).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.approved) && (doc.request_date.getMonth() == addMonths(new Date(), -4).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -4).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.approved) && (doc.request_date.getMonth() == addMonths(new Date(), -3).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -3).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.approved) && (doc.request_date.getMonth() == addMonths(new Date(), -2).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -2).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.approved) && (doc.request_date.getMonth() == addMonths(new Date(), -1).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -1).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.approved) && (doc.request_date.getMonth() == new Date().getMonth() && doc.request_date.getFullYear() == new Date().getFullYear()) }).length
                ],
                backgroundColor: ["#00be32"]
            },
            {
                label: 'Em Análise',
                data: [
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.under_analysis) && (doc.request_date.getMonth() == addMonths(new Date(), -11).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -11).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.under_analysis) && (doc.request_date.getMonth() == addMonths(new Date(), -10).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -10).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.under_analysis) && (doc.request_date.getMonth() == addMonths(new Date(), -9).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -9).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.under_analysis) && (doc.request_date.getMonth() == addMonths(new Date(), -8).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -8).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.under_analysis) && (doc.request_date.getMonth() == addMonths(new Date(), -7).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -7).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.under_analysis) && (doc.request_date.getMonth() == addMonths(new Date(), -6).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -6).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.under_analysis) && (doc.request_date.getMonth() == addMonths(new Date(), -5).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -5).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.under_analysis) && (doc.request_date.getMonth() == addMonths(new Date(), -4).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -4).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.under_analysis) && (doc.request_date.getMonth() == addMonths(new Date(), -3).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -3).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.under_analysis) && (doc.request_date.getMonth() == addMonths(new Date(), -2).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -2).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.under_analysis) && (doc.request_date.getMonth() == addMonths(new Date(), -1).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -1).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.under_analysis) && (doc.request_date.getMonth() == new Date().getMonth() && doc.request_date.getFullYear() == new Date().getFullYear()) }).length
                ],
                backgroundColor: ["#ff9100"]
            },
            {
                label: 'Não Enviados',
                data: [
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.new || doc.status == eDocumentStatus.invalid) && (doc.request_date.getMonth() == addMonths(new Date(), -11).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -11).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.new || doc.status == eDocumentStatus.invalid) && (doc.request_date.getMonth() == addMonths(new Date(), -10).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -10).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.new || doc.status == eDocumentStatus.invalid) && (doc.request_date.getMonth() == addMonths(new Date(), -9).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -9).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.new || doc.status == eDocumentStatus.invalid) && (doc.request_date.getMonth() == addMonths(new Date(), -8).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -8).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.new || doc.status == eDocumentStatus.invalid) && (doc.request_date.getMonth() == addMonths(new Date(), -7).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -7).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.new || doc.status == eDocumentStatus.invalid) && (doc.request_date.getMonth() == addMonths(new Date(), -6).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -6).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.new || doc.status == eDocumentStatus.invalid) && (doc.request_date.getMonth() == addMonths(new Date(), -5).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -5).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.new || doc.status == eDocumentStatus.invalid) && (doc.request_date.getMonth() == addMonths(new Date(), -4).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -4).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.new || doc.status == eDocumentStatus.invalid) && (doc.request_date.getMonth() == addMonths(new Date(), -3).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -3).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.new || doc.status == eDocumentStatus.invalid) && (doc.request_date.getMonth() == addMonths(new Date(), -2).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -2).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.new || doc.status == eDocumentStatus.invalid) && (doc.request_date.getMonth() == addMonths(new Date(), -1).getMonth() && doc.request_date.getFullYear() == addMonths(new Date(), -1).getFullYear()) }).length,
                    documents.filter((doc) => { return (doc.status == eDocumentStatus.new || doc.status == eDocumentStatus.invalid) && (doc.request_date.getMonth() == new Date().getMonth() && doc.request_date.getFullYear() == new Date().getFullYear()) }).length
                ],
                backgroundColor: ["#dc3546"]
            }]
        };

        return last12MonthsOverview;
    }

    async getDashBoardData(): Promise<any> {
        const contracts: Contract[] = await this.contractRepository.find();
        for (let i = 0; i < contracts.length; i++) {
            const contract = contracts[i];
            await this.contractService.generatePendingDocuments(contract.id);
        }

        const dashboardCardsData: any = (await getConnection().query(SELECT_DASHBOARD_CARDS_DATA))[0];

        const data: any = {
            totalCompaniesCount: dashboardCardsData.totalCompaniesCount,
            newCompaniesCount: dashboardCardsData.newCompaniesCount,
            totalContractsCount: dashboardCardsData.totalContractsCount,
            newContractsCount: dashboardCardsData.newContractsCount,
            totalRequestedDocumentsCount: dashboardCardsData.totalRequestedDocumentsCount,
            totalApprovedDocumentsCount: dashboardCardsData.totalApprovedDocumentsCount,
            newRequestedDocumentsCount: dashboardCardsData.newRequestedDocumentsCount,
            newApprovedDocumentsCount: dashboardCardsData.newApprovedDocumentsCount,

            lastMonthOverview: await this.getLast30DaysDocumentsOverview(),

            last12MonthsOverview: await this.getLast12MonthsDocumentsOverview()
        }

        return data;
    }
}
