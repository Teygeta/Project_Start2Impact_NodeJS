CREATE TABLE IF NOT EXISTS products(
	id_product int not null AUTO_INCREMENT,
  name_product text unique,
  PRIMARY KEY(id_product)
);

CREATE TABLE IF NOT EXISTS users(
	id_user int not null AUTO_INCREMENT,
  name_user text,
  surname_user text,
  email_user text unique,
  PRIMARY KEY(id_user)
);

CREATE TABLE IF NOT EXISTS orders(
  number_order int not null AUTO_INCREMENT,
	id_order int not null,
  date_order timestamp,
  id_product int not null,
  id_user int not null,
  PRIMARY KEY(number_order),
  FOREIGN KEY(id_product) REFERENCES products(id_product) ON DELETE CASCADE,
  FOREIGN KEY(id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

-- example of data to insert
INSERT INTO products (name_product) VALUES
("pane"),
("cocacola"),
("spaghetti"),
("pomodoro"),
("pollo"),
("riso"),
("marmellata"),
("avocado"),
("nocci"),
("rucola"),
("peperoni"),
("noodles"),
("merluzzo"),
("gelato");

INSERT INTO users (name_user, surname_user, email_user) VALUES 
("Mario","Rossi", "mrossi@email.mail"),
("Maria","Viola", "mviola@email.mail"),
("Luigi","Verdi", "lverdi@email.mail"),
("Sara","Neri", "sneri@email.mail");

INSERT INTO orders (id_order, id_product, id_user) VALUES 
("2432", "2", "3"),
("2432", "11", "3"),
("2432", "5", "3"),
("2432", "6", "3"),
("5767", "12", "2"),
("5767", "10", "2"),
("5767", "5", "2"),
("9785", "2", "1"),
("9785", "3", "1"),
("4563", "7", "4"),
("4563", "9", "4"),
("4563", "14", "4");