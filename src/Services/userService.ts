import {BaseService} from "./baseService";
import {IUser} from "../Types/user";
import axios from "axios";

class UserService extends BaseService {
    protected url = `${this.baseUrl}users` as string

    async getAll(): Promise<IUser[] | []>{
        const response = await axios.get(this.url)
        return response?.data || []
    }

    async login({email, password}: Omit<IUser, "id">): Promise<void> {
        const found: Array<IUser> = (await axios.get<IUser[] | []>(this.url)).data
            .filter((user: IUser) => (user.email === email && user.password === password))
        if (found[0]) {
            localStorage.setItem("token", "true")
        }
    }

    async registration(new_user: Omit<IUser, "id">): Promise<void> {
        const response = await axios.post<IUser>(this.url, new_user)
        if (response.data) {
            localStorage.setItem("token", "true")

        }
    }

    checkToken(): boolean {
        return !!localStorage.getItem("token")
    }

    async logout(): Promise<void> {
        localStorage.removeItem("token")
    }
}

export default new UserService()