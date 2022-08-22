import { IContact } from "./contact";

export interface IModal {
  open: boolean;
  contact: IContact | null;
}
