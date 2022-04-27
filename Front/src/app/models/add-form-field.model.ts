export interface AddFormFieldModel{
    contractId: string;
    title: string;
    subtitle: string;
    recurrence: number;
    individual: boolean;
    required: boolean;
    firstRequestDate: Date;
}