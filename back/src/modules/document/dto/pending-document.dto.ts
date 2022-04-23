import { FileDto } from "./file.dto";

export class DocumentDto {
    id: string;
    title: string;
    subtitle: string;
    tooltipText: string;
    status: number;
    file: FileDto = new FileDto();
    requestDate: Date;
}