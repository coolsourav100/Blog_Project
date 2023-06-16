const db = require('../util/dataBase') ;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = ((req,res,next)=>{
    // console.log(req.body,'=================>')
    let email = req.body.email
    let username = req.body.username;
    let password = req.body.password
    // Check For Existing Users
    let q = "SELECT * FROM users WHERE email=? OR username = ? "
    db.query(q,[email,username],(err,data)=>{
        if(err){
            res.send(err)
            console.log(err)
        }
        if(data.length){
          return  res.status(408).send('user Already exists!')
        }
        // encrypt the Password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const q = `INSERT INTO users (username ,email,password) VALUES (?)`
        let values = [username , email , hash]
        db.query(q,[values],(err,data)=>{
            if(err){
               res.json(err)
            //   return  console.log(err)
            }else{
             res.status(200).send("User created")
            }
        })

    })
    
})
exports.login = ((req,res,next)=>{
    let username = req.body.username ;
    let password1 = req.body.password
    // Check If the user Exist Or Not
    // const salt = bcrypt.genSaltSync(10);
    //     const hash = bcrypt.hashSync(password, salt);
    const q = `SELECT * FROM users WHERE usernaME=?`
    db.query(q,[username],(err,data)=>{
        if(err){
            return res.json(err)
        }
        if(data.length==0){
            return res.status(404).json('User Not Found')
        }
        // Check For Password
        let checkPassword = bcrypt.compareSync(password1,(data[0].password).toString())
        if(!checkPassword){
            return res.status(400).json('Invalid UserName Or PassWord')
        }
        const token = jwt.sign({id:data[0].id},'jwtkey')
        const {password,...other} = data[0]
        res.cookie('access-token',token , {
            httpOnly : true
        }).status(200).json(other)
    })

})
exports.logout = ((req,res,next)=>{

})