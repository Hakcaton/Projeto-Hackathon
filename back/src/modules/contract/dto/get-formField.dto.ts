export class GetFormFieldDto {
    id: string;
    title: string;
    subtitle: string;
    recurrence: number;
    individual: boolean;
    required: boolean;
    firstRequestDate: Date;
}