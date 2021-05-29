const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
   
    createUser : function(user,con,resp){
        console.log(user.password)
        const getUser = function(id){
            con.query("SELECT name,user_id FROM USERS WHERE user_id = ?",[id],(err,rows)=>{
                if(err) throw err
                resp.send({createdUser:rows[0]})
                
            })
        }
        
        bcrypt.hash(user.password, saltRounds, (err, hash)=> {
            if(err) throw err
           
            con.query("INSERT INTO users(name,password) VALUES(?,?)",[user.user_name,hash],(err,rows)=>{
                if(err) throw err;
                console.log(rows.insertId)
                getUser(rows.insertId)
            })
        });
        
        
    },
    setPreference : function(con,city_codes,user_id,resp){
      

        if(city_codes>3) {
            resp.status(400).send({error:"Only 3 preferred cities are allowed!"})
            
            return ;
        }
        city_codes.forEach(code=>{
            if([1176734,1264527,1277333,1273294,1275339,1275004,1279233,1259229,1279259,1256237].indexOf(code)<0) {
                resp.status(400).send({error:"Bad data"})
                return -1
            }

        })

        addCities = function(city_codes,user_id){
            city_codes.forEach(city_id=>{
                con.query("INSERT INTO usercity(city_code,user_id) VALUES(?,?)",[city_id,user_id],(err,res)=>{
                    if(err) throw err
                    else {
                        
                        
                    }
                   
                })
            })
            resp.send({message:"Success!"})
        }
        con.query("SELECT COUNT(user_id) AS count FROM usercity WHERE user_id = ?",[user_id],(err,res)=>{
            if(err) throw err
            console.log(res[0].count)
            if(res[0].count > 3) {
                resp.status(400).send({error:"Not more than three preferred cities allowd!"});
            }
            else if(res[0].count + city_codes.length > 3) {
                console.log("hiiting")
                resp.status(400).send({error:"Can not add more!"});
                
            }
            else {
               
                addCities(city_codes,user_id)
            }
        })
        
        
        
    },
    getData(con,user_id,resp){
      
        const res =  con.query("SELECT * from weather_data WHERE city_code IN ( SELECT city_code from usercity WHERE user_id = ?) ",[user_id],(err,res)=>{
            if(err) throw err
            resp.send(res)
          
        })
    }
}