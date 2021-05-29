
CREATE TABLE `weather_data` (`city_id` INT NOT NULL AUTO_INCREMENT,`city_name` VARCHAR(255),`description` VARCHAR(255),`min_temp` FLOAT,`max_temp` FLOAT,`wind_speed` FLOAT,`cloud_perc` FLOAT,`curr_temp` FLOAT,`city_code` INT , PRIMARY KEY (`city_id`));


CREATE TABLE `users` (`name` VARCHAR(255),`password` VARCHAR(255),`user_id` INT NOT NULL AUTO_INCREMENT,PRIMARY KEY (`user_id`));


CREATE TABLE `userCity` (`user_id` INT NOT NULL,`city_code` INT);

 ALTER TABLE usercity ADD FOREIGN KEY(user_id) REFERENCES users(user_id);

 ALTER TABLE usercity ADD FOREIGN KEY(city_code) REFERENCES weather_data(city_code);