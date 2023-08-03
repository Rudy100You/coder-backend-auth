import { UserRepository } from "../repository/user.repository.js";

const userRepository = new UserRepository()

const userService ={
    findUserById: async(id)=> await userRepository.getOneById(id),
    findUserByCriteria:async(criteria)=>await userRepository.getOneByCriteria(criteria),
    createUser:async(user)=>await userRepository.create(user)
}
export default userService