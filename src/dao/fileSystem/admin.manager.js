import {__dirname} from "../../utils.js";
import fs from "fs"

export class AdminManager {
    constructor (){
        this.path = __dirname+"\\data\\admins.json"
            if (!fs.existsSync(this.path)) 
            throw "Error: File not Found";
    }
    async findAdminByEmailAndPassword(email, password){
            const adminUsers = await this.parseDataFromFile()
            const adminUser = adminUsers.admins.find((user)=> user.email === email && user.password === password)
            return adminUser
        }

    async parseDataFromFile() {
    return JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    }
} 