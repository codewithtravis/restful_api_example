CREATE DATABASE crudapp /*name of database to be created*/

CREATE TABLE crudapp( /*database table created and its variables*/
    crud_id SERIAL PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(50),
    link VARCHAR(100),
    gpa VARCHAR(5),
    description VARCHAR(255)
);