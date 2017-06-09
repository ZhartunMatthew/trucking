      /*---- ENTITY ----*/

/*trucking_company*/
INSERT INTO trucking_company (name, taxpayer_number, country, city, street, house)
  VALUES ('ОАО_ГРУЗ', '351AO21P', 'Беларусь', 'Минск', 'Калиновского', '74/2');
INSERT INTO trucking_company (name, taxpayer_number, country, city, street, house)
  VALUES ('РОС_ТРАНС', '256МЕ89А', 'Россия', 'Москва', 'пр. Кутозовский', '54');
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
INSERT INTO user (name, surname, patronymic, email, country, city, street, house, flat, login,  password,  salt,  trucking_company, user_role)
  VALUES ('Иван', 'Иванов', 'Иванович', 'ivanov123@mail.ru', 'Беларусь','Минск', 'Калиновского', '21', '65', 'ivan_superman', '1111', '5gds7fs7', NULL, 'SYSTEM_ADMIN');
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
commit;

/*car*/
INSERT INTO car (number, brand, car_type, model, fuel_consumption,  is_available, trucking_company)
  VALUES ('3214-MAN', 'bmw',  'TANK', '15-1566-05', 26.6, TRUE, 1);
INSERT INTO car (number, brand, car_type, model, fuel_consumption,  is_available, trucking_company)
  VALUES ('9999-GTY', 'bmw', 'COVERED_BODY', 'МАЗ-54323', 26.6, TRUE , 1);
INSERT INTO car (number, brand, car_type, model, fuel_consumption,  is_available, trucking_company)
  VALUES ('3928-ABC', 'bmw', 'REFRIGIRATOR', 'МАЗ-54323', 26.6, FALSE , 1);
INSERT INTO car (number, brand, car_type, model, fuel_consumption,  is_available, trucking_company)
  VALUES ('1058-EDF', 'bmw', 'REFRIGIRATOR', '15-1566-05', 26.6, FALSE , 1);
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
            destination_date, destination_country, destination_city, destination_street, destination_house, destination_longitude,  destinatione_latitude,
            waybill_number, id_invoice, waybill_state, price, total_distance)
    VALUES ('2017-04-21', 'Беларусь', 'Минск', 'ул. Богдановича', '117а', 'широта', 'долгота', NULL, 'Россия', 'Москва', 'пр.Свободы', '31', 'широта', 'долгота',
            '834761', 2, 'TRANSPORTATION_STARTED', 1200, 2900);

/*state d, delivered*/
INSERT INTO invoice (invoice_number, dispatcher, register_date, manager, check_date, car, customer_company, destination_customer_company, trucking_company, driver, invoice_state )
  VALUES ('834760', 3, '2017-03-22', 4, '2017-03-23', 3, 1, 2, 1, 5, 'DELIVERED');
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Компьютер планшетный', 210, 'DELIVERED', 3); /*delivered*/
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Монитор', 3, 'LOST', 3);  /*lost*/
INSERT INTO waybill (departure_date, departure_country, departure_city,  departure_stree, departure_house, departure_latitude, departure_longitude,
                           destination_date, destination_country, destination_city, destination_street, destination_house, destination_longitude,  destinatione_latitude,
                           waybill_number, id_invoice, waybill_state, price, total_distance)
      VALUES ('2017-03-22', 'Беларусь', 'Минск', 'ул. Богдановича', '117а', 'широта', 'долгота', '2017-03-24', 'Россия', 'Москва', 'пр.Свободы', '31', 'широта', 'долгота',
              '834760', 3, 'TRANSPORTATION_COMPLETED', 1500, 3100);
commit;

/*checkpoint*/
INSERT INTO check_point (description, latitude, longitude, path_date, way_bill)
  VALUES ('Могилев', 'широта', 'долгота', '2017-04-21', 1);
INSERT INTO check_point (description, latitude, longitude, path_date, way_bill)
      VALUES ('Смоленск', 'широта', 'долгота', NULL, 1);
INSERT INTO check_point (description, latitude, longitude, path_date, way_bill)
VALUES ('Смоленск', 'широта', 'долгота', '2017-03-23', 2);
commit;