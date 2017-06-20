use trucking;
/*---- ENTITY ----*/

/*trucking_company*/
INSERT INTO trucking_company (name, taxpayer_number, country, city, street, house)
  VALUES ('ОАО_ГРУЗ', '351AO21P', 'Беларусь', 'Минск', 'Калиновского', '74/2');
INSERT INTO trucking_company (name, taxpayer_number, country, city, street, house)
  VALUES ('РОС_ТРАНС', '256МЕ89А', 'Россия', 'Москва', 'пр.Кутозовский', '54');
INSERT INTO trucking_company (name, taxpayer_number, country, city, street, house)
  VALUES ('ТРАНСАВТО', '678АУ78Р', 'Беларусь', 'Брест', 'Ленина', '12');
commit;

/*customer_company*/
INSERT INTO customer_company (name, taxpayer_number, country, city, street, house, trucking_company)
  VALUES ('IBA', '980TH32E', 'Беларусь', 'Минск', 'Богдановича', '155',1);
INSERT INTO customer_company (name, taxpayer_number, country, city, street, house, trucking_company)
  VALUES ('Торговая сила', '730PH99K', 'Беларусь', 'Минск', 'Уральская', '21а',1);
commit;

/*user*/
/*System_Admin*/
# system admin already exists
/*Admin*/
INSERT INTO user (name, surname, patronymic, email, country, city, street, house, flat, login,  password,  salt,  trucking_company, user_role)
  VALUES ('Петров', 'Петр', 'Петрович', 'petrov123@mail.ru', 'Беларусь', 'Минск', 'Казинца', '38', '176', 'petya_superman', '2222', 'e89wr78w', 1, 'ADMIN');
/*Dispatcher*/
INSERT INTO user (name, surname, patronymic, email, country, city, street, house, flat, login,  password,  salt,  trucking_company, user_role)
  VALUES ('Борискин', 'Борис', 'Борисович', 'borisov123@mail.ru', 'Беларусь', 'Минск', 'пр. Машерова', '32', '567', 'boris_superman', '3333', 'fse5sfr8', 1, 'DISPATCHER');
/*Manager*/
INSERT INTO user (name, surname, patronymic, email, country, city, street, house, flat, login,  password,  salt,  trucking_company, user_role)
  VALUES ('Прекрасная', 'Елена', 'Васильевна', 'lenka123@mail.ru', 'Беларусь', 'Минск', 'Ульяновская', '123', '4', 'lena_superwoman', '4444', 'ert46xkr', 1, 'MANAGER');
/*Driver*/
INSERT INTO user (name, surname, patronymic, email, country, city, street, house, flat, login,  password,  salt,  trucking_company, user_role)
  VALUES ('Моржов', 'Анатолий', 'Петрович', 'tolik123@mail.ru', 'Беларусь', 'Минск', 'Асаналиева', '7', '223', 'tolik_superman', '5555', 'c8s0f8sa', 1, 'DRIVER');
/*Company owner*/
INSERT INTO user (name, surname, patronymic, email, country, city, street, house, flat, login,  password,  salt,  trucking_company, user_role)
  VALUES ('Абрамович', 'Аркадий', 'Иванович', 'abram123@mail.ru', 'ОАЭ', 'Абу-Даби', 'Царская', '14', 'е', 'abram_superman', '6666', 'ds0fsa8a', 1, 'COMPANY_OWNER');

INSERT INTO user (name, surname, patronymic, email, country, city, street, house, flat, login,  password,  salt,  trucking_company, user_role)
  VALUES ('Васин', 'Василий', 'Васильев', 'vasya123@mail.ru', 'Беларусь', 'Минск', 'Асаналиева', '7', '223', 'vasya_superman', '5555', 'c8s0f8sa', 1, 'DRIVER');
commit;

/*car*/
INSERT INTO car (number, brand, car_type, model, fuel_consumption,  is_available, trucking_company)
  VALUES ('3214-MAN', 'bmw',  'TANK', '15-1566-05', 26.6, TRUE, 1);
INSERT INTO car (number, brand, car_type, model, fuel_consumption,  is_available, trucking_company)
  VALUES ('9999-GTY', 'bmw', 'COVERED_BODY', 'МАЗ-54323', 26.6, TRUE , 1);
INSERT INTO car (number, brand, car_type, model, fuel_consumption,  is_available, trucking_company)
  VALUES ('3928-ABC', 'bmw', 'REFRIGERATOR', 'МАЗ-54323', 26.6, FALSE , 1);
INSERT INTO car (number, brand, car_type, model, fuel_consumption,  is_available, trucking_company)
  VALUES ('1058-EDF', 'bmw', 'REFRIGERATOR', '15-1566-05', 26.6, FALSE , 1);
commit;

/*invoice + product + waybill*/

/*state b, registered but not checked*/
INSERT INTO invoice (invoice_number, dispatcher, register_date, manager, check_date, car, customer_company, destination_customer_company,  trucking_company, driver, invoice_state )
  VALUES ('834762', 3, '2017-04-25', NULL, NULL, 2, 1, 2, 1, 5, 'ISSUED');
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Компьютер планшетный', 110, 'REGISTERED', 1);
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Ноутбук', 300, 'REGISTERED', 1);
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Системный блок', 50, 'REGISTERED', 1);

/*state c, checked*/
INSERT INTO invoice (invoice_number, dispatcher, register_date, manager, check_date, car, customer_company, destination_customer_company,  trucking_company, driver, invoice_state )
  VALUES ('834761', 3, '2017-04-20', 4, '2017-04-21', 3, 1, 2, 1, 5, 'CHECKED');
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Монитор', 215, 'CHECKED', 2);
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Блок охлаждения', 132, 'CHECKED', 2);
INSERT INTO waybill (departure_date, departure_country, departure_city,  departure_stree, departure_house, departure_latitude, departure_longitude,
            destination_date, destination_country, destination_city, destination_street, destination_house, destinatione_latitude, destination_longitude,
            waybill_number, id_invoice, waybill_state, price, total_distance)
    VALUES ('2017-04-21', 'Беларусь', 'Минск', 'улица Богдановича', '117а', '53.9353069', '27.5790794', NULL, 'Россия', 'Москва', 'проспект Свободы', '31', '55.838039', '37.4514803',
            '834761', 2, 'TRANSPORTATION_STARTED', 1200, 2900);

/*state d, delivered*/
INSERT INTO invoice (invoice_number, dispatcher, register_date, manager, check_date, car, customer_company, destination_customer_company, trucking_company, driver, invoice_state )
  VALUES ('834760', 3, '2017-03-22', 4, '2017-03-23', 3, 1, 2, 1, 5, 'DELIVERED');
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Компьютер планшетный', 210, 'DELIVERED', 3); /*delivered*/
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Монитор', 3, 'LOST', 3);  /*lost*/
INSERT INTO waybill (departure_date, departure_country, departure_city,  departure_stree, departure_house, departure_latitude, departure_longitude,
                           destination_date, destination_country, destination_city, destination_street, destination_house, destinatione_latitude, destination_longitude,
                           waybill_number, id_invoice, waybill_state, price, total_distance)
      VALUES ('2017-03-22', 'Беларусь', 'Минск', 'улица Богдановича', '117а', '53.9353069', '27.5790794', '2017-03-24', 'Россия', 'Москва', 'проспект Свободы', '31', '55.838039', '37.4514803',
              '834760', 3, 'TRANSPORTATION_COMPLETED', 1500, 3100);
commit;

/*checkpoint*/
INSERT INTO check_point (description, latitude, longitude, path_date, way_bill)
  VALUES ('Могилев', '53.883542', '30.2815377', '2017-04-21', 1);
INSERT INTO check_point (description, latitude, longitude, path_date, way_bill)
      VALUES ('Смоленск', '54.7801138', '31.9299219', NULL, 1);
INSERT INTO check_point (description, latitude, longitude, path_date, way_bill)
VALUES ('Смоленск', '54.7801138', '31.9299219', '2017-03-23', 2);
commit;

UPDATE user
SET password = "$2a$10$P5xd53WzHjjUyliGd0uZA.ylsCYGIG31LKK3cbJ4SrecURxjWVihq"
WHERE id_user = 1;

UPDATE user
SET password = "$2a$10$G5A3KcRmqTtmQd0kAigFH.rSus30vTrOVM1jPZYhvgGNQuOO.vb3q"
WHERE id_user = 2;

UPDATE user
SET password = "$2a$10$1Lwg6vaLPe8b90wPE71mnex.swiTvAHJH774cllWtX90OJxONz8wy"
WHERE id_user = 3;

UPDATE user
SET password = "$2a$10$C0CPPwdquY9wZBnNipFU8e35afE6ahZsXhCnVYMizaEZGC1IHV8xS"
WHERE id_user = 4;

UPDATE user
SET password = "$2a$10$HPw0gHvDp03aWcYZ.LDvHu7VAmPT5HBKxax83Arv978.8X1ZgACFy"
WHERE id_user = 5;

UPDATE user
SET password = "$2a$10$tveXoVLTOMvjI0HxbQnf5uxoue5nLhl5BuJgLVLEOo.GKxdxwlhbS"
WHERE id_user = 6;

UPDATE user
SET password = "$2a$10$HPw0gHvDp03aWcYZ.LDvHu7VAmPT5HBKxax83Arv978.8X1ZgACFy"
WHERE id_user = 7;

UPDATE product
SET price = 300
WHERE id_product = 1;

UPDATE product
SET price = 450
WHERE id_product = 2;

UPDATE product
SET price = 200
WHERE id_product = 3;

UPDATE product
SET price = 150
WHERE id_product = 4;

UPDATE product
SET price = 200
WHERE id_product = 5;

UPDATE product
SET price = 400
WHERE id_product = 6;

UPDATE product
SET price = 300
WHERE id_product = 7;

UPDATE waybill
set price = 12000, total_distance = 300
WHERE id_waybill = 1;

UPDATE waybill
set price = 9000, total_distance = 200
WHERE id_waybill = 2;

UPDATE user
SET is_available = 1
WHERE id_user = 5;

UPDATE user
SET is_available = 1
WHERE id_user = 7;

UPDATE product
SET lost_amount = 1, lost_reason = 'SPOILED', lost_description='Product was broken'
WHERE id_product = 7;

UPDATE invoice
    SET driver = 7, invoice_state = 'DELIVERED'
WHERE id_invoice = 2;

UPDATE product
SET product_state = 'LOST', lost_amount = 5, lost_reason = 'SPOILED', lost_description='Product was broken'
WHERE id_product = 4;

UPDATE product
SET product_state = 'DELIVERED'
WHERE id_product = 5;

UPDATE waybill
SET departure_date = '2017-04-30', waybill_state = 'TRANSPORTATION_COMPLETED'
WHERE id_waybill = 1;

UPDATE check_point
SET path_date = '2017-04-29'
WHERE id_checkpoint = 2;

UPDATE car
SET is_available = 1
WHERE id_car = 3;

UPDATE car
SET is_available = 1
WHERE id_car = 4;

INSERT INTO customer_company
(name, taxpayer_number, country, city, street, house, trucking_company)
VALUES ('ОАО РосТорг', '219ЕT34K', 'Россия', 'Москва', 'пр. Кутузовский', '79с', 1);

INSERT INTO customer_company
(name, taxpayer_number, country, city, street, house, trucking_company)
VALUES ('OOO Компьютербай', '736AB10C', 'Беларусь', 'Брест', 'пл. Свободы', '12', 1);

