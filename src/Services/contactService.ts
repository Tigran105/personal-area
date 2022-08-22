import { BaseService } from "./baseService";
import { IContact } from "../Types/contact";
import axios from "axios";

class ContactService extends BaseService {
  protected url = `${this.baseUrl}contacts/` as string;

  async getData(): Promise<IContact[]> {
    const response = await axios.get<IContact[]>(`${this.url}`);
    return response?.data || [];
  }

  async addContact(contact: Omit<IContact, "id">): Promise<IContact[]> {
    await axios.post<IContact>(`${this.url}`, contact);
    const response = await axios.get(this.url);
    return response.data;
  }

  async updateContact(contact: IContact): Promise<IContact[]> {
    await axios.put<IContact>(`${this.url}${contact.id}`, contact);
    const response = await axios.get(this.url);
    return response?.data;
  }

  async deleteContact(id: number): Promise<IContact[]> {
    await axios.delete<number>(`${this.url}${id}`);
    const response = await axios.get(this.url);
    return response?.data || [];
  }
}

export default new ContactService();
