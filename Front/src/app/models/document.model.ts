export interface DocumentModel {
  id: string;
  title: string;
  subtitle: string;
  tooltip_text: string;
  state: number;
  file: FileModel | null;
}

export interface FileModel {
  base64: string;
  name: string;
}
