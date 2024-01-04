import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../jwt/auth.js";
import UserDao from "../daos/mongoDB/users.dao.js";
const userDao = new UserDao();

export const checkToken = async (req, res, next) => {
  try {

    const cookieToken = req.cookies.token
    if (!cookieToken) return res.status(401).json({ msg: "Unauthorized" });
    const decode = jwt.verify(cookieToken, PRIVATE_KEY);
    console.log("👹Token Decodificado => ", decode); //payload ---> {userId: id de mongo},este es el objeto que viene desde la fn "generateToken" en auth.js 
    const user = await userDao.getById(decode.userId);
    if (!user) return res.status(401).json({ msg: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    console.log("👹Error de la fn checkToken en checktoken.js", error);
  }
};
