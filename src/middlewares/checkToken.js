import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../jwt/auth.js";
import UserDao from "../daos/mongoDB/users.dao.js";
const userDao = new UserDao();

export const checkToken = async (req, res, next) => {
  try {
    // const authHeader = req.headers('Authorization') - otra psoibilidad
    const authHeader = req.get("Authorization");
    // 'Bearer gdfgdfgdg16dfg65df4g564dfg¿??=¿?=¿?' <= asi recibimos el token , Desp con un split() quitaremos esa prefijo "Bearer"
    if (!authHeader) return res.status(401).json({ msg: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    // esto es lo que obetenemos desp del split() = 'gdfgdfgdg16dfg65df4g564dfg¿??=¿?=¿?'
    const decode = jwt.verify(token, PRIVATE_KEY);
    console.log("👹decode::", decode); //payload ---> {userId: id de mongo},este es el objeto que viene desde la fn "generateToken" en auth.js 
    const user = await userDao.getById(decode.userId);
    if (!user) return res.status(401).json({ msg: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    console.log("👹Error de la fn checkToken en checktoken.js", error);
  }
};
