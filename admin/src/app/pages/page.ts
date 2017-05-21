export class Page {
  _id?: string;
  name: string;
  header: string;
  content: string;
  position: number;
  path: string;
  parentId: string;
  languages: Array<string>;
  visible: boolean;
  menu: boolean;
  start: boolean;
}
