create table users(
    id serial not null primary key,
    firstname text not null,
    lastname text not null,
    username text not null,
    password text not null
);

create table movies(
    id serial not null primary key,
    user_id int,
    movie_id int,
    foreign key (user_id) references users(id)
);