import express from "express";
import cookieParser from "cookie-parser";

const app = express();

const secretKey = "1234"

app.use(cookieParser(secretKey))
app.use(express.json());

app.get("/cookies/set-idioma", (req, res) => {
    res.cookie('idioma', 'ingles').json({ msg: 'Cookie "idioma" setted ok' });
});

app.get("/get-cookie", (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    const { idioma } = req.cookies;
    idioma === "ingles" ? res.send('Hello World') : res.send('Hola Mundo');
});

app.get("/cookies/set-saludo", (req, res) => {
    res.cookie("saludo", "wenas", { maxAge: 2700 }).json({msg: 'Cookie "Saludo" setted ok'})
});

app.get("/cookies/set-signed-cookie", (req, res) => {
    res.cookie("name", "Fer", { signed: true}).json({msg: '"Signed-cookie" setted ok'})
});

app.get("/cookies/clear-cookie", (req, res) => {
    res.clearCookie("name").json({msg: 'Cookie Cleared '})
});

app.listen(3000, () => console.log("server OK"));