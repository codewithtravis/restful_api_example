CREATE DATABASE studata; /*name of database to be created*/
CREATE DATABASE camdata; /*name of database to be created*/

/*database table created and its variables*/
CREATE TABLE studata( 
    studata_id SERIAL PRIMARY KEY,
    sname VARCHAR(100),
    sgpa VARCHAR(5),
    slink VARCHAR(100)
);

/*database table created and its variables*/
CREATE TABLE camdata( 
    camdata_id SERIAL PRIMARY KEY,
    cname VARCHAR(100),
    clocation VARCHAR(100),
    clink VARCHAR(100),
    cdescription VARCHAR(255)
);