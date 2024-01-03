import jwt from "jsonwebtoken";

export const PRIVATE_KEY = "1234";


export const generateToken = (user) => {
  const payload = { // pauload = aqui se guardara la informacion del cliente, en este caso su ID (seria el ID generado mongo)
  userId: user._id,
  };

  const token = jwt.sign(payload, PRIVATE_KEY, { //sign encripta la informacoin que le pasamos y define la vida del token 
    expiresIn: "20m", //minutos= 20m, horas= 2h, segundos= 120s
  });

  return token;
};

//esta informacion se va a guardar en el HEADER: "Authorization"