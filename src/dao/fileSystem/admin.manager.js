import {__dirname, pathJoin} from "../../utils.js";
import fs from "fs"

export class AdminManager {
    constructor (){
        this.path = pathJoin(__dirname,"data","admins.json")
            if (!fs.existsSync(this.path)) 
            throw "Error: File not Found";
    }
    async findAdminByEmailAndPassword(email){
            const adminUsers = await this.parseDataFromFile()
            const adminUser = adminUsers.admins.find((user)=> user.email === email)
            return adminUser
        }

    async parseDataFromFile() {
    return JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    }
} 