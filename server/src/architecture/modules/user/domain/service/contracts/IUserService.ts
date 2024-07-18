import { stringMap } from "aws-sdk/clients/backup";
import { LoginInfo, RegisterInfo } from "../../../types";

/**
 * Interface for user services.
 */
export interface IUserService {

    /**
     * Logs in a user.
     * 
     * @param {LoginInfo} param0 - Login information.
     * @param {string} param0.username - Username.
     * @param {string} param0.password - User password.
     * @returns {Promise<void>} A promise that resolves when the login is successful.
     */
    login({username, password}: LoginInfo): Promise<void>;

    /**
     * Registers a new user.
     * 
     * @param {RegisterInfo} param0 - Registration information.
     * @param {string} param0.name - Full name of the user.
     * @param {string} param0.username - Username.
     * @param {string} param0.email - User email.
     * @param {string} param0.type - User type.
     * @returns {Promise<void>} A promise that resolves when the registration is successful.
     */
    register({name, username, email, type, password}: RegisterInfo): Promise<void>;
}
