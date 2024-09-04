import mysql.connector

conn = mysql.connector.connect(
    host = "192.168.1.61",
    user = "root",
    password = "password",
    database = "simpleHack"
)

import random
from datetime import datetime, timedelta

# Funzione per generare valori casuali in un intervallo
def random_float(min_value, max_value):
    return round(random.uniform(min_value, max_value), 8)

# Coordinate di Firenze
florence_latitude = [43.7618, 43.7789]
florence_longitude = [11.2401, 11.2685]

# Connessione al database SQLite (o altro tipo di database)
cursor = conn.cursor()

cur.execute('''CREATE DATABASE simpleHack; USE simpleHack
            CREATE TABLE IF NOT EXISTS `users` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`user_id` int NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`logged_in` boolean NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `user_log` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`user_id` int NOT NULL,
	`timestamp` datetime NOT NULL,
	`latitude` int NOT NULL,
	`longitude` int NOT NULL,
	`magnitude` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `login_log` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`user_id` int NOT NULL,
	`timein` datetime NOT NULL,
	`timeout` datetime NOT NULL,
	PRIMARY KEY (`id`)
);


ALTER TABLE `user_log` ADD CONSTRAINT `user_log_fk1` FOREIGN KEY (`user_type`) REFERENCES `users`(`user_type_id`);

ALTER TABLE `user_log` ADD CONSTRAINT `user_log_fk2` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`);
ALTER TABLE `login_log` ADD CONSTRAINT `login_log_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`);")
''')
            
# Genera e esegui le query per inserire 1000 voci
for _ in range(100):
    user_id = 1
    timestamp = datetime.now() - timedelta(days=random.randint(0, 365))  # Data casuale negli ultimi 365 giorni
    latitude = random_float(*florence_latitude)
    longitude = random_float(*florence_longitude)
    magnitude = round(random.uniform(20, 120), 3)  # Valore casuale tra 0 e 120

    # Query SQL per inserire i dati nella tabella user_log
    query = f"INSERT INTO user_log (user_id, timestamp, latitude, longitude, magnitude) " \
            f"VALUES ({user_id}, '{timestamp}', {latitude}, {longitude}, {magnitude})"
    
    cursor.execute(query)

# Esegui il commit delle modifiche e chiudi la connessione
conn.commit()
conn.close()

print("Inserimento completato.")
