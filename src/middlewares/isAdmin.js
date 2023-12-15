export const isAdmin = (req, res, next) => {
    if (req.session.info.isAdmin) next();
    else res.status(401).json({ msg: "No eres Administrador" });    
}