export interface DocumentModel {
  id: string;
  title: string;
  subtitle: string;
  tooltipText: string;
  status: number;
  file: FileModel;
  requestDate: Date;
}

export interface FileModel {
  base64: string;
  name: string;
}
