import { IUserService } from "./contracts/IUserService";
import { LoginInfo, RegisterInfo } from "../../types";
import bcrypt from "bcrypt";
import { inject, injectable } from "inversify";
import { TYPES } from "../../utils/TYPES";
import { IUserRepository } from "../repository";
import jwt from "jsonwebtoken";
import { env } from "node:process";
import { UserModel } from "../model";
const getEnv = (key: string): string => (env[key] ? (env[key] as string) : "");

interface JwtPayload {
  userId: string;
}
@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async login({ email, password }: LoginInfo) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Something goes wrong!");
    }

    const passwordMatch = await this.comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new Error("Something goes wrong!"); //TODO - melhorar
    }

    const token = jwt.sign({ userId: user._id }, getEnv("SECRET_MONGODB_KEY"), {
      expiresIn: "1 hour",
    });
    return token;
  }

  private async comparePassword(
    candidatePassword: string,
    userPassword: string
  ) {
    const isEqual = await bcrypt.compare(candidatePassword, userPassword);
    return isEqual;
  }

  async register({
    fullName,
    email,
    password,
    type,
  }: RegisterInfo): Promise<void> {
    // TODO - verificação de email e fullName repetidos
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new Error("Email already exists");
    }

    await this.userRepository.register({
      fullName,
      email,
      password,
      type,
    });

    return;
  }

  async authenticate(token: string) {
    if (!token) throw new Error("Authentication required");

    try {
      const decodedToken = jwt.verify(
        token,
        getEnv("SECRET_MONGODB_KEY")
      ) as JwtPayload;
      const user = await this.userRepository.findById(decodedToken.userId);
      if (!user) throw "Invalid token"; //TODO  - melhorar esse retorno
      return user;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
