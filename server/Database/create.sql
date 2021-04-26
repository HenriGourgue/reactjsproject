truncate table if exists favorite;
drop table if exists favorite;

truncate table if exists user;
drop table if exists user;

CREATE TABLE IF NOT EXISTS user(
    id MEDIUMINT not null AUTO_INCREMENT,
    name varchar(100),
    email varchar(100),
    password varchar(200),
    primary key(id)
);

CREATE TABLE IF NOT EXISTS favorite(
    id MEDIUMINT not null AUTO_INCREMENT,
    name varchar(100),
    abv decimal(5,2),
    image varchar(400),
    description longtext,
    tag varchar(400),
    userId MEDIUMINT,
    date varchar(50),
    primary key(id),
    foreign key(userId) references user(id)
);
