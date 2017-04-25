export class Page {
  _id?: string;
  name: string;
  header: string;
  content: string;
  position: number;
  path: string;
  parentId: number;
  languages: Array<string>;
  visible: boolean;
  menu: boolean;
}
