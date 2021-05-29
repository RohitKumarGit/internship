# internship Weather API

Please follow these steps to setup the Endpoints Locally

1. Setup the Mysql Database :
use these SQL commands to setup the database , tables and the relationships ( `setup.sql` in root ).
```
CREATE DATABASE internship;
use internship;
CREATE TABLE `weather_data` (`city_id` INT NOT NULL AUTO_INCREMENT,`city_name` VARCHAR(255),`description` VARCHAR(255),`min_temp` FLOAT,`max_temp` FLOAT,`wind_speed` FLOAT,`cloud_perc` FLOAT,`curr_temp` FLOAT,`city_code` INT , PRIMARY KEY (`city_id`));
CREATE TABLE `users` (`name` VARCHAR(255),`password` VARCHAR(255),`user_id` INT NOT NULL AUTO_INCREMENT,PRIMARY KEY (`user_id`));
CREATE TABLE `userCity` (`user_id` INT NOT NULL,`city_code` INT);
ALTER TABLE usercity ADD FOREIGN KEY(user_id) REFERENCES users(user_id);


```

2. Move to the root directory
3. create `.env` file in the root directory using the following template:
![image](https://user-images.githubusercontent.com/59276987/120057705-c9ce4a80-c062-11eb-9ce3-7b62621bb0d8.png)

```
SQL_HOST =localhost
SQL_PORT=3306
SQL_USER=root
SQL_PASSWORD=YES
API_KEY = ae89363b2bb77f4fccc6a6be2b940d68
```
5. Install NPM packages : `npm i`
6. Start the server : `node app.js`


## API Endpoints :

Base URL : `http://localhost:8085/api/`

#### `POST` /registerUser
body:
```
{
	"user":{
			"user_name":"New User",
			"password":"password"
	}
}
```

Response
```
{
  "createdUser": {
    "name": "New User",
    "user_id": 26
  }
}
```
#### `POST` /updateWeatherData
body:
```
empty
```

Response
```
{
  "success": "Weather data updated !"
}
```
#### `POST` /setUserPreferences
body:
```
{
	"city_codes":[1176734,1275339],
	"user_id":0
}
```
| City_name     | city_code           |
| ------------- |:-------------:|
| 1176734     | Hyderabad | 
|1264527      | Chennai      |  
|1277333 | Bangalore     |   
|1273294    | Delhi | 
| 1275339     | Mumbai      |  
| 1275004 | Kolkata     |   
| 1279233    | Ahemdabad| 
| 1259229      | Pune      |  
| 1279259 | Agra      |   
| 1256237 | Shimla      |   

Response
```
{
  "message": "Success!"
}
```
#### `GET` /userWeatherData
body:
```
{

	"user_id":1
}
```

Response
```
[
  {
    "city_id": 73,
    "city_name": "Hyderabad",
    "description": "scattered clouds",
    "min_temp": 32.71,
    "max_temp": 32.71,
    "wind_speed": 9.22,
    "cloud_perc": 31,
    "curr_temp": 32.71,
    "city_code": 1176734
  },
  {
    "city_id": 74,
    "city_name": "Chennai",
    "description": "few clouds",
    "min_temp": 31,
    "max_temp": 32.78,
    "wind_speed": 6.17,
    "cloud_perc": 20,
    "curr_temp": 32.03,
    "city_code": 1264527
  }
]
```


