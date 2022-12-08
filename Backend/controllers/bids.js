var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const Pool = require('pg').Pool;
const db = new Pool({
    user: 'admin',  //Database username
    host: 'localhost',  //Database host
    database: 'freelance_db', //Database database
    password: 'admin12345', //Database password
    port: 5432//Database port
  });

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
  

exports.addBid = async (req, res)=>{
    // const user_id = req.params.user_id;
    const {post_id, price , duration , user_id,dev_id} = req.body;
    const freelancer = req.params.freelancer;
    
    const sql = 'INSERT INTO bids (post_id,price,duration,freelancer,user_id,dev_id,hidden) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *';

    db.query(sql,[post_id, price, duration,freelancer,user_id,dev_id,false],(err,results)=>{

        if(err)
        {
            res.status(400).json({message:'Query failed'});
        }else
        {
            db.query("SELECT * FROM users WHERE user_id = $1",[user_id],(db_error,emailResults)=>{
                emailDetails.from = sender;
                emailDetails.to = emailResults.rows[0].email;
                emailDetails.text = "Good Day "+emailResults.rows[0].name+'\n\nYou have a new bid for a post you added.\n\nHead over to your app and review it.\n\nDevLab.com Team ';
            
                emailDetails.subject = "New Bid!";

                transporter.sendMail(emailDetails,(emailErr)=>{
                    if(emailErr){
                        res.status(400).json({message:emailErr.message});

                    }else{
                        res.status(200).json({message:'Your bid was successfully placed '});
                    }

                })

            })


        }

    });
}

exports.getBids = async (req, res)=>{

    const sql = 'SELECT * FROM bids WHERE user_id = $1 and hidden = $2';
    db.query(sql,[req.params.user_id,false],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.decline = async (req, res)=>{

    const sql = 'UPDATE bids SET hidden = $1 WHERE bid_id = $2';
    db.query(sql,[true,req.params.bid_id],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json({message:'Bid Declined and Removed'});

        }

    })
    
}


//Client accepting Bid from Freelancer
exports.accept = async (req, res)=>{

    const {dev_id,dev_name,dev_surname} = req.body;
    const post_id = req.params.post_id;
    //console.log({dev_id,dev_name,dev_surname,post_id})
    const defaultStatus = 1;
    const sql = 'UPDATE posts SET dev_id = $1, dev_name = $2, dev_surname =$3, status =$4 WHERE post_id = $5 returning *';

    db.query(sql,[dev_id,dev_name,dev_surname,defaultStatus,post_id],(db_err,results)=>{
        if (db_err) {
           // console.log(db_err)
            res.status(400).json({message:db_err});

        }else {

            db.query("SELECT * FROM users WHERE user_id = $1",[dev_id],(db_error,emailResults)=>{
                emailDetails.from = sender;
                emailDetails.to = emailResults.rows[0].email;
                emailDetails.text = "Congratulations! "+dev_name+'\n\nYour bid for '+results.rows[0].post_title +' has been accepted by the client.We wish you the best of luck as the post is now assigned to you and is set to \'in progress\' \n\nDevLab.com Team ';
            
                emailDetails.subject = "Bid Accepted!";

                transporter.sendMail(emailDetails,(emailErr)=>{
                    if(emailErr){
                        res.status(420).json(emailErr);

                    }else{
                        db.query('UPDATE bids SET hidden = $1 WHERE post_id = $2',[true,post_id],(err,hideResults)=>{
                            if(err)
                            {
                                res.status(401).json({message: err.message});

                            }else{
                                res.status(200).json({message:'Bid accepted, An email sent to the developer'});
                            }
                        });
                        

                    }
                })


            })
            
            
        }


    })


}



