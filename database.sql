CREATE DATABASE getpet; /*name of database to be created*/


/*database table created and its variables*/
CREATE TABLE userlogin( 
    email VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    hash VARCHAR(50) NOT NULL,
    isAdmin INT DEFAULT 0
);

/*database table created and its variables*/
CREATE TABLE petinfo( 
    id SERIAL PRIMARY KEY,
    breed VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR(200) NOT NULL,
    reservation_id VARCHAR(50) REFERENCES userlogin(email) DEFAULT NULL
);