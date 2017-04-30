      /*---- ENUMS ----*/

/*user_role*/
INSERT INTO user_role (description) VALUE ('System_Admin');
INSERT INTO user_role (description) VALUE ('Admin');
INSERT INTO user_role (description) VALUE ('Dispatcher');
INSERT INTO user_role (description) VALUE ('Manager');
INSERT INTO user_role (description) VALUE ('Driver');
INSERT INTO user_role (description) VALUE ('Company_Owner');
commit;

/*auto_type*/
INSERT INTO auto_type (description) VALUE ('Tank');
INSERT INTO auto_type (description) VALUE ('Сovered_body');
INSERT INTO auto_type (description) VALUE ('Refrigerator');
commit;

/*product_state*/
INSERT INTO product_state (description) VALUE ('Registered');
INSERT INTO product_state (description) VALUE ('Checked');
INSERT INTO product_state (description) VALUE ('Delivered');
INSERT INTO product_state (description) VALUE ('Lost');
commit;

/*invoice_state*/
INSERT INTO invoice_state(description) VALUE ('Issued');
INSERT INTO invoice_state(description) VALUE ('Checked');
INSERT INTO invoice_state(description) VALUE ('Delivered');
commit;

/*waybill_state*/
INSERT INTO waybill_state(description_enum) VALUE ('Transportation_started');
INSERT INTO waybill_state(description_enum) VALUE ('Transportation_completed');
commit;

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
INSERT INTO customer_company (name, taxpayer_number, country, city, house, street, trucking_company)
  VALUES ('IBA', '980TH32E', 'Беларусь', 'Минск', 'Богдановича', '155',1);
INSERT INTO customer_company (name, taxpayer_number, country, city, house, street, trucking_company)
  VALUES ('Торговая сила', '730PH99K', 'Беларусь', 'Минск', 'Уральская', '21а',1);
commit;

/*user*/
/*System_Admin*/
INSERT INTO user (name, surname, patronymic, email, city, street, house, flat, login,  password,  salt,  trucking_company, user_role)
  VALUES ('Иван', 'Иванов', 'Иванович', 'ivanov123@mail.ru', 'Минск', 'Калиновского', '21', '65', 'ivan_superman', 'fd8sf97s07f', '5gds7fs7', NULL, 1 );
/*Admin*/
INSERT INTO user (name, surname, patronymic, email, city, street, house, flat, login,  password,  salt,  trucking_company, user_role)
  VALUES ('Петров', 'Петр', 'Петрович', 'petrov123@mail.ru', 'Минск', 'Казинца', '38', '176', 'petya_superman', 'gfd7gs9gs0sfe', 'e89wr78w', 1, 2);
/*Dispatcher*/
INSERT INTO user (name, surname, patronymic, email, city, street, house, flat, login,  password,  salt,  trucking_company, user_role)
  VALUES ('Борискин', 'Борис', 'Борисович', 'borisov123@mail.ru', 'Минск', 'пр. Машерова', '32', '567', 'boris_superman', 'dasdr78rew9w', 'fse5sfr8', 1, 3);
/*Manager*/
INSERT INTO user (name, surname, patronymic, email, city, street, house, flat, login,  password,  salt,  trucking_company, user_role)
  VALUES ('Прекрасная', 'Елена', 'Васильевна', 'lenka123@mail.ru', 'Минск', 'Ульяновская', '123', '4', 'lena_superwoman', '2f37gs9gsdsf5', 'ert46xkr', 1, 4);
/*Driver*/
INSERT INTO user (name, surname, patronymic, email, city, street, house, flat, login,  password,  salt,  trucking_company, user_role)
  VALUES ('Моржов', 'Анатолий', 'Петрович', 'tolik123@mail.ru', 'Минск', 'Асаналиева', '7', '223', 'tolik_superman', 'fs89fsd0gs7w', 'c8s0f8sa', 1, 5);
/*Company owner*/
INSERT INTO user (name, surname, patronymic, email, city, street, house, flat, login,  password,  salt,  trucking_company, user_role)
  VALUES ('Абрамович', 'Аркадий', 'Иванович', 'abram123@mail.ru', 'Абу-Даби', 'Царская', '14', 'е', 'abram_superman', 'dsaf8fsdfsd9', 'ds0fsa8a', 1, 6);
commit;

/*auto*/
INSERT INTO auto (number, auto_type, model, fuel_consumption,  is_available, trucking_company)
  VALUES ('3214-MAN', 1, '15-1566-05', 26.6, TRUE, 1);
INSERT INTO auto (number, auto_type, model, fuel_consumption,  is_available, trucking_company)
  VALUES ('9999-GTY', 2, 'МАЗ-54323', 26.6, FALSE, 1);
INSERT INTO auto (number, auto_type, model, fuel_consumption,  is_available, trucking_company)
  VALUES ('3928-ABC', 2, 'МАЗ-54323', 26.6, FALSE , 1);
INSERT INTO auto (number, auto_type, model, fuel_consumption,  is_available, trucking_company)
  VALUES ('1058-EDF', 3, '15-1566-05', 26.6, FALSE , 1);
commit;

/*invoice + product + waybill*/

/*state b, registered but not checked*/
INSERT INTO invoice (invoice_number, dispatcher, register_date, manager, check_date, auto, customer_company,  trucking_company, driver, invoice_state )
  VALUES ('834762', 3, '25.04.2017', NULL, NULL, 2, 1, 1, 4, 1);
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Компьютер планшетный', 110, 1, 1);
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Ноутбук', 300, 1, 1);
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Системный блок', 50, 1, 1);

/*state c, checked*/
INSERT INTO invoice (invoice_number, dispatcher, register_date, manager, check_date, auto, customer_company,  trucking_company, driver, invoice_state )
  VALUES ('834761', 3, '20.04.2017', 4, '21.04.2017', 3, 1, 1, 4, 2);
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Монитор', 215, 2, 2);
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Блок охлаждения', 132, 2, 2);
INSERT INTO waybill (departure_date, departure_city,  departure_stree, departure_house, departure_latitude, departure_longitude,
            destination_date, destination_city, destination_street, destination_house, destination_longitude,  destinatione_latitude,
            waybill_number, id_invoice, waybill_state)
    VALUES ('21.04.2017', 'Минск', 'ул. Богдановича', '117а', 'широта', 'долгота', NULL, 'Москва', 'пр.Свободы', '31', 'широта', 'долгота',
            '834761', 2, 1);

/*state d, delivered*/
INSERT INTO invoice (invoice_number, dispatcher, register_date, manager, check_date, auto, customer_company,  trucking_company, driver, invoice_state )
  VALUES ('834760', 3, '20.03.2017', 4, '22.03.2017', 3, 1, 1, 4, 3);
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Компьютер планшетный', 210, 3, 3); /*delivered*/
INSERT INTO product (name, amount, product_state, invoice) VALUES ('Монитор', 3, 4, 3);  /*lost*/
INSERT INTO waybill (departure_date, departure_city,  departure_stree, departure_house, departure_latitude, departure_longitude,
                           destination_date, destination_city, destination_street, destination_house, destination_longitude,  destinatione_latitude,
                           waybill_number, id_invoice, waybill_state)
      VALUES ('22.03.2017', 'Минск', 'ул. Богдановича', '117а', 'широта', 'долгота', '24.03.2017', 'Москва', 'пр.Свободы', '31', 'широта', 'долгота',
              '834760', 3, 2);
commit;

/*checkpoint*/
INSERT INTO check_point (description, latitude, longitude, path_date, way_bill)
  VALUES ('Могилев', 'широта', 'долгота', '21.04.2017', 1);
INSERT INTO check_point (description, latitude, longitude, path_date, way_bill)
      VALUES ('Смоленск', 'широта', 'долгота', NULL, 1);
INSERT INTO check_point (description, latitude, longitude, path_date, way_bill)
VALUES ('Смоленск', 'широта', 'долгота', '23.03.2013', 2);
commit;