//const bcrypt = require("bcrypt")
const database = require("../config/db-config");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//const generateAccessToken = require("../auth/generateAccessToken")

const Pool = require('pg').Pool;

const saltRounds = 12;
const db = new Pool({
    user: 'admin',  //Database username
    host: 'localhost',  //Database host
    database: 'freelance_db', //Database database
    password: 'admin12345', //Database password
    port: 5432//Database port
  });

  const defaultImage = "https://res.cloudinary.com/dev-lab/image/upload/v1668614930/user_c0tzhg.png";

  const defaultRating = 0.0;
  const defaultCounter = 0;

//   dev-lab.com@outlook.com
  const sender =  "dev-lab.com@outlook.com";
var transporter = nodemailer.createTransport({
       
    service:'hotmail',
    auth: {
      user: 'dev-lab.com@outlook.com', // 
      pass: 'DevLab444', // 
    },
  });

  emailDetails = {
    from: '', //where the email is from 
    to: '', //where the email is to
    subject: '', //email subject
    text: '', //email
    
     
  }

exports.register = async (req, res)=>{ 

    const { email , password ,name ,surname ,account } = req.body;

    const sql = 'SELECT * FROM users WHERE email = $1 ';
    db.query(sql,[email],(err, results)=>{
        if(results.rowCount == 0)
        {
            // bcrypt.hash(password, saltRounds,(err,hash)=>{
            //     if (err)
            //     {
            //         res.status(err).json({
            //             error: "Server error",
            //             });
            //     } 
            //     const  hashPassword  = {
            //         password: hash
            //         };
                db.query(

                    'INSERT INTO users (name,surname,email,password,account,image,rating,ratings_counter) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING user_id',[name,surname,email,password,account,defaultImage,defaultRating,defaultCounter],
                    (db_err,results) => {

                        if(db_err)
                        {
                            res.status(400).json({message:'Query failed'});
                        }else
                        {
                            res.status(200).json({message: name+' has been registered, Please login'});
                        }
                        
                        
                   //})    
            })
        }else
        {
            res.status(400).json({message:'User already exists, Please login!'});
        }
    });
}


exports.forgotPassword  = (req, res) =>{
    const email = req.body.email;
    const sql = "SELECT * FROM users WHERE email = $1";
    db.query(sql,[email],(err, results)=>{
        if(results.rowCount == 0)
        {
            res.status(400).json({message:'No user registered with this email address'})
        }
        else
        {
            emailDetails.from = sender;
            emailDetails.to = results.rows[0].email;
            emailDetails.text = "Good day "+results.rows[0].name+'\n\nAs per request, please find your password\n'+results.rows[0].password+'\nUse the credentials to sign in to your account. \n\nDevLab.com';
        
            emailDetails.subject = "Credentials request";

            transporter.sendMail(emailDetails,(emailErr)=>{
                if(emailErr){
                    res.status(400).json(emailErr);
                }else{
                    res.status(200).json({message:'Your password has been sent to your to your email address'})
                }
            });


            
        }

    })





}

exports.login =  (req, res)=>{
    
    const {email,password} = req.body;
    const sql = 'SELECT * FROM users WHERE email = $1';
    db.query(sql,[email],(err, results)=>{
        if(err) 
        {res.status(400).json({message: "Error communicating with database"})}
        else{
            if(results.rowCount == 0)
            {
                res.status(400).json({message: "User does not exist, Please register"})
            }else{
                //bcrypt.compare(password,results.rows[0].password,(passErr,result)=> {
                    if(password != results.rows[0].password)
                    {
                        res.status(400).json({message: "Invalid Credentials, Please try again"});

                    }else
                    {
                        const token = jwt.sign({
                                user_id: results.rows[0].user_id,
                                email: results.rows[0].email,
                                name: results.rows[0].name,
                                surname: results.rows[0].surname,
                                account: results.rows[0].account,
                                password: results.rows[0].password,
                                image: results.rows[0].image,
                                rating: results.rows[0].rating
                            },
                            'retyuihhgdxfcghvjbkhgfxgfchtfu',{

                                algorithm: 'HS256',
                                expiresIn: 120
                            });
                            res.status(200).json({message: "Welcome! "+results.rows[0].name,token: token,}); 
                   }
                //})
                 
                    
                }

            

        }

    })  
}

exports.getOneUser = (req, res) => {

    const user_id = req.params.user_id;
    //console.log(user_id);

    const sql = 'SELECT * FROM users WHERE user_id = $1';
    db.query(sql,[user_id],(err, results)=>{
        if(err) {
            //console.log(err)
             res.status(400).json({message:'Query failed'}) }else{
            res.status(200).json(results.rows[0]);
        }
    })
}


exports.updateUser = async (req, res)=>{
   
    const user_id = req.params.user_id;
    const { password ,name ,surname} = req.body;
  
    db.query(
      'UPDATE users SET password = $1 ,name = $2, surname = $3  WHERE user_id = $4',
        [password ,name ,surname , user_id],
       (error,results) => {
        if (error) {
            res.status(400).json({message:'Query failed'});
        }else {res.status(200).json({message:'Your profile was updated successfully'});}
    
      })
}

exports.updateImage = async (req,res) => {
    //console.log(req.body.link)

    const link = req.body.link;
    const user_id = req.params.user_id;

    db.query('UPDATE users SET image = $1 WHERE user_id = $2',[link,user_id],(err,results)=>{
        if(err){
            res.status(400).json({message:err.message});
        }else
        {
            res.status(200).json({message:'Your profile picture was updated successfully'});
        }

    })

}

//Progress status function
exports.pstatus = async (req, res)=>{
 
 
    const {toDo,doing,done} = req.body;

    const {post_id,client_id,dev_id} = req.params;
  
    const sql = 'SELECT * FROM users WHERE user_id =$1';
  
    db.query(sql,[client_id],(db_err,clientResults)=>{
        if (db_err) {
            res.status(400).json({message:error.message});
        }else {
  
            db.query("SELECT * FROM posts WHERE post_id =$1",[post_id],(db_error, postResults)=>{
                if (db_error) {
                    res.status(400).json({message:db_error.message});
                }else{

                    db.query(sql,[dev_id],(db_err,devResults)=>{
                        if (db_err) {
                            res.status(400).json({message:db_err.message});
                        }else{
                            

                            emailDetails.from = sender;
                            emailDetails.to = clientResults.rows[0].email;
                            emailDetails.subject = "REPORT:"+postResults.rows[0].post_title;

                            emailDetails.text = "Hi "+clientResults.rows[0].name+"\n\nThis is a report based on your post ("+postResults.rows[0].post_title+") from "+devResults.rows[0].name+"\n\nTasks to-do:\n"+toDo+"\n\nTasks Currently Doing:\n"+doing+"\n\nTasks Done:\n"+done+"\n\n\nDeveloper\n"+devResults.rows[0].name

                            transporter.sendMail(emailDetails,(emailErr)=>{
                                if(emailErr){
                                    res.status(400).json(emailErr.message);
              
                                }else{
                                    res.status(200).json({message:'Report sent to the client'});
                                }
                            })
    
                        }
    
                    })

                }

            })        
           
        }
  
    })
  
  
 }
 