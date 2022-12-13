const Pool = require('pg').Pool;
var smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require("nodemailer");

const db = new Pool({
    user: 'admin',  //Database username
    host: 'localhost',  //Database host
    database: 'Donation', //Database database
    password: 'admin12345', //Database password
    port: 5432//Database port
  });

  const sender =  "changeworld12@outlook.com";

  var transporter = nodemailer.createTransport({
       
    service:'hotmail',
    auth: {
      user: 'changeworld12@outlook.com', 
      pass: 'ChangeWorld', 
    },
  });

  emailDetails = {
    from: '', //where the email is from 
    to: '', //where the email is to
    subject: '', //email subject
    text: '', //email
    
     
  }


exports.addDonations = async (req, res)=>{
    const user_id = req.params.user_id;
    const {type, description , address, date, time } = req.body;
    const Donation = req.params.donation;
    
    const sql = 'INSERT INTO donations (donations_type, donations_description, donations_address, user_id, hidden,status, date, time) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING donations_id';
 
    db.query(sql,[type, description , address ,user_id, false,"No Status",date,time],(err,results)=>{
        console.log(err)
        if(err)
        {
            
            res.status(400).json({message:'Query failed'});
        }else
        {
            res.status(200).json({message: 'Your donation was successfully added '});
            {
                db.query("SELECT * FROM users WHERE user_id = $1",[dev_id],(db_error,emailResults)=>{
                    emailDetails.from = sender;
                    emailDetails.to = emailResults.rows[0].email;
                    emailDetails.text = "Congratulations! "+dev_name+'\n\nYou have a donation '+results.rows[0].donations_title +' from the good samaritan \'in progress\' \n\nChange world ';
                
                    emailDetails.subject = "Donated";
    
                    transporter.sendMail(emailDetails,(emailErr)=>{
                        if(emailErr){
                            res.status(400).json(emailErr);
    
                        }else{
                            db.query('UPDATE donations SET hidden = $1 WHERE donations_id = $2',[true,donations_id],(err,hideResults)=>{
                                if(err)
                                {
                                    res.status(401).json({message: err.message});
    
                                }else{
                                    res.status(200).json({message: 'An email sent to the donee'});
                                }
                            });
                            
    
                        }
                    })
    
    
                })
            }
        }

    });
}



exports.getDonation = async (req, res)=>{

    const sql = 'SELECT * FROM donations WHERE hidden = $1  and status = $2';
    db.query(sql,[false,'No Status'],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.getCompleted = async (req, res)=>{
    
    completed = 'Completed';
    const sql = 'SELECT * FROM donations WHERE status = $1 and (user_id = $2 or dev_id = $3)';
    db.query(sql,[completed,req.params.user_id,req.params.user_id],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{
            

            res.status(200).json(results.rows);

        }

    })
    
}

exports.getInProgress = async (req, res)=>{
    progress = 'In Progress';
    const sql = 'SELECT * FROM donations WHERE (user_id = $2 or dev_id = $3) and status = $1 ';
    db.query(sql,[progress,req.params.user_id,req.params.user_id],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.getOneDonation = async (req, res)=>{
    const user_id = req.params.user_id;

    const sql = 'SELECT * FROM donations WHERE user_id = $1';
    db.query(sql,[user_id],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.getDonorDonations = async (req, res)=>{


    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM donations WHERE user_id = $1 and hidden = $2';
    db.query(sql,[user_id,false],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.deleteDonation = async (req, res)=>{

    const sql = 'UPDATE donations SET hidden = $2 WHERE donations_id = $1';
    db.query(sql,[req.params.donations_id,true],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json({message:'Donation Post Deleted'});

        }

    })
    
}


exports.updateDonation = async (req, res)=>{
    
    const donations_id = req.params.donations_id;
    const { donations_type, donations_desc, donations_address } = req.body;
  
    db.query(
      'UPDATE donations SET  donations_type = $1, donations_desc = $2, donations_address= $3 WHERE donations_id = $4',
      [donations_type, donations_desc, donations_address,donations_id],
      (error, results) => {
        if (error) {
            res.status(400).json({message:error.message});
        }else {res.status(200).json({message:'Your donation was updated successfully'});}

        
      }
    )
}

exports.updateStatus = async (req, res)=>{
    
   
    const {status,donations_id} = req.body;

    db.query(
      'UPDATE donations SET status = $1 WHERE donations_id = $2',
      [status,donations_id],
      (error, results) => {
        if (error) {

            res.status(400).json({message:error.message});

        }else{res.status(200).json({message:'Your donation was updated successfully'});}
      }
    )
}


