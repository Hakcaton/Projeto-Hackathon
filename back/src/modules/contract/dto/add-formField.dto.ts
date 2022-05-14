export interface AddFormFieldDto {
    title: string;
    subtitle: number;
    description?: string
    recurrence: number;
    individual: boolean;
    required: boolean;
    firstRequestDate: Date;
}