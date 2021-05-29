
const axios = require('axios');
// city_code   city names 
// 1176734, - hyderabad
// 1264527, - chennai
// 1277333, - bangalore
// 1273294, - Delhi
// 1275339, - mumbai
// 1275004, - kolkata
// 1279233, ahemdabad
// 1259229, pune
// 1279259, Agra
// 1256237, Shimla
module.exports = {
    updateWeather : function(con,resp){
                const insertCities = async function(){
                    
                    const {data} = await axios.get("http://api.openweathermap.org/data/2.5/group?id=1176734,1264527,1277333,1273294,1275339,1275004,1279233,1259229,1279259,1256237&units=metric&appid="+process.env.API_KEY);
                    data.list.forEach(record=>{
                      
                        const data = [record.name,record.weather[0].description,record.main.temp_min,record.main.temp_max,record.wind.speed,record.clouds.all,record.main.temp,record.id]
                 
                      con.query("INSERT INTO weather_data (city_name,description,min_temp,max_temp,wind_speed,cloud_perc,curr_temp,city_code) VALUES(?,?,?,?,?,?,?,?)",data,(err,res)=>{
                          if(err) throw err
                          
                      })
                    })
                    resp.send({success:"Weather data updated !"})
                }
                
                const getCount =  function(){
                    con.query("SELECT COUNT(city_id) AS count FROM weather_data ",function(err,rows){
                        if(err) throw err
                        if(rows[0].count == 0){
                            insertCities()
                        }
                        else {
                           
                            con.query("DELETE FROM weather_data",function(err,res){
                                if(err) throw err
                                insertCities()
                            })
                           
                        }
                    })
                }
                getCount()
               
                
    }
}