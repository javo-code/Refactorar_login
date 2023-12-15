import { Router } from "express";

const router = Router();

router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/profile', (req, res)=>{
    res.render('profile')
})

router.get('/admin-profile', (req, res)=>{
    res.render('admin-profile')
})

router.get('/register-error', (req, res)=>{
    res.render('register-error')
})

export default router; 