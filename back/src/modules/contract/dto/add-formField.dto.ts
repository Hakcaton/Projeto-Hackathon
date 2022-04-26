export interface AddFormFieldDto {
    title: string;
    subtitle?: string;
    recurrence: number;
    individual: boolean;
    required: boolean;
}