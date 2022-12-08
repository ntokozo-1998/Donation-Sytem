
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'admin',  //Database username
    host: 'localhost',  //Database host
    database: 'freelance_db', //Database database
    password: 'admin12345', //Database password
    port: 5432//Database port
  });


exports.addPost = async (req, res)=>{
    const user_id = req.params.user_id;
    const {title, price , description } = req.body;
    //const freelancer = req.params.freelancer;

    //console.log(req.body)
    
    const sql = 'INSERT INTO posts (post_price, post_title, post_desc, user_id, hidden,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING post_id';
 
    db.query(sql,[price,title , description , user_id, false,0],(err,results)=>{
        if(err)
        {
            
            res.status(400).json({message:'Query failed'});
        }else
        {
            res.status(200).json({message: 'Your post was successfully added '});
        }

    });
}



exports.getPosts = async (req, res)=>{

    const sql = 'SELECT * FROM posts WHERE hidden = $1  and status = $2';
    db.query(sql,[false,0],(error,results)=>{
        if(error)
        {
            //console.log(error)
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.getCompleted = async (req, res)=>{
    
    completed = 100;
    const sql = 'SELECT * FROM posts WHERE status = $1 and (user_id = $2 or dev_id = $3)';
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
    completed = 100;
    noStatus = 0;
    const sql = 'SELECT * FROM posts WHERE (user_id = $2 or dev_id = $3) and status <> $1 and status <> $4';
    db.query(sql,[completed,req.params.user_id,req.params.user_id,noStatus],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.getPostStatus = async (req, res)=>{

    const post_id = req.params.post_id;

    const sql = 'SELECT * FROM posts WHERE post_id = $1';
    db.query(sql,[post_id],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })

}

exports.getOnePost = async (req, res)=>{
    const user_id = req.params.user_id;

    const sql = 'SELECT * FROM posts WHERE user_id = $1';
    db.query(sql,[user_id],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.getClientPosts = async (req, res)=>{


    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM posts WHERE user_id = $1 and hidden = $2';
    db.query(sql,[user_id,false],(error,results)=>{
        if(error)
        {
            //console.log(error)
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.deletePost = async (req, res)=>{

    const sql = 'UPDATE posts SET hidden = $2 WHERE post_id = $1';
    db.query(sql,[req.params.post_id,true],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json({message:'Job Post Deleted'});

        }

    })
    
}


exports.updatePost = async (req, res)=>{
    
    const post_id = req.params.post_id;
    const { post_price, post_title, post_desc } = req.body;
  
    db.query(
      'UPDATE posts SET  post_price = $1, post_title = $2, post_desc= $3 WHERE post_id = $4',
      [post_price, post_title, post_desc,post_id],
      (error, results) => {
        if (error) {
            res.status(400).json({message:error.message});
        }else {res.status(200).json({message:'Your post was updated successfully'});}

        
      }
    )
}


var count = 0;
var currentRating = 0.0;


exports.rateDeveloper = async (req, res)=>{

    const {dev_id,rating} = req.body;
   

    const sql = 'SELECT * FROM users WHERE user_id = $1';
    db.query(sql,[dev_id],(err, results)=>{
        if(err) { res.status(400).json({message:'Query failed'}) }
        else{
            count = results.rows[0].ratings_counter;
            currentRating = results.rows[0].rating;

            let newCount = count + 1;
            let newRating = ((currentRating * count) + rating)/(newCount);
            newRating = Math.round( newRating * 10 ) / 10;
            

            //Updating values in the db
            db.query(
                'UPDATE users SET rating = $1, ratings_counter = $2 WHERE user_id = $3',
                [newRating,newCount,dev_id],
                (error, rateResults) =>{
                    if(err) { res.status(400).json({message:'Query failed'}) }
                    else{
                        res.status(200).json({message:'Thank you for rating this developer.'})
                    }
                })  
        }
    })


}

exports.updateStatus = async (req, res)=>{
    
   
    const {status,post_id} = req.body;

    db.query(
      'UPDATE posts SET status = $1 WHERE post_id = $2',
      [status,post_id],
      (error, results) => {
        if (error) {

            res.status(400).json({message:error.message});

        }else{res.status(200).json({message:'Your post was updated successfully'});}
      }
    )
}


