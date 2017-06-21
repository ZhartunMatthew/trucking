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
INSERT INTO customer_company (name, taxpayer_number, country, city, street, house, trucking_company)
  VALUES ('ОАО РосТорг', '219ЕT34K', 'Россия', 'Москва', 'пр. Кутузовский', '79с', 1);
INSERT INTO customer_company(name, taxpayer_number, country, city, street, house, trucking_company)
  VALUES ('OOO Компьютербай', '736AB10C', 'Беларусь', 'Брест', 'пл. Свободы', '12', 1);
INSERT INTO customer_company(city, country, house, name, street, taxpayer_number, trucking_company)
  VALUES ('Минск','Беларусь','10','ТехАрт','Толстого','45ФА',1);
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

UPDATE user
SET is_available = 1
WHERE id_user = 5;

UPDATE user
SET is_available = 1
WHERE id_user = 7;

INSERT INTO car (is_available, brand, fuel_consumption, model, number, trucking_company, car_type)
VALUES
  (TRUE,  'MAN',  20.1, '26',   'AK 6658-3', 1, 'TANK'),
  (TRUE,  'МАЗ',  15.6, '4370', 'АМ 1925-1', 1, 'COVERED_BODY'),
  (TRUE,  'МАЗ',  25.1, '6310', 'АИ 2831-6', 1, 'REFRIGERATOR'),
  (TRUE,  'MAN',  19.8, 'TGM18','АК 3794-5', 1, 'REFRIGERATOR'),
  (TRUE,  'Volvo',21.1, 'FH',   'ОН 1247-1', 1, 'COVERED_BODY');

INSERT INTO invoice (check_date, invoice_number, register_date, car, customer_company, dispatcher, driver, manager, trucking_company, invoice_state, destination_customer_company)
VALUES
  ('2017-03-25',  '846285',   '2017-03-25', 2, 5, 3, 5, 4, 1, 'DELIVERED',1),
  ('2017-04-21',  '7496724',  '2017-04-21', 4, 2, 3, 7, 4, 1, 'DELIVERED',3),
  ('2017-05-03',  '375946',   '2017-05-03', 1, 2, 3, 5, 4, 1, 'DELIVERED',2),
  ('2017-05-22',  '48762395', '2017-05-22', 3, 2, 3, 7, 4, 1, 'DELIVERED',3);


INSERT INTO waybill (departure_city, departure_date, departure_house, departure_latitude, departure_longitude, departure_stree, destination_city, destination_date, destination_house, destinatione_latitude, destination_longitude, destination_street, waybill_number, id_invoice, price, total_distance, waybill_state, departure_country, destination_country)
VALUES
  ('Минск',   '2017-03-25', '36', '53.9046107','27.56174550000003','улица Интернациональная','Санкт-Петербург','2017-03-29','16','59.93387500000001','30.33508299999994','Садовая улица','6478396',1,19000,945.792,'TRANSPORTATION_COMPLETED','Беларусь','Россия'),
  ('Минск',   '2017-04-21', '36', '53.9046107','27.56174550000003','улица Интернациональная','Berlin','2017-04-27','7E','52.52068999999999','13.40494000000001','Karl-Liebknecht-Straße','476936',2,30000,1134.439,'TRANSPORTATION_COMPLETED','Беларусь','Германия'),
  ('Орша',    '2017-05-03', '1',  '54.5074171','30.41123689999995','улица Революционная','Брест','2017-05-10','10','52.09762139999999','23.734050300000035','улица Комсомольская','476295',3,25000,567.675,'TRANSPORTATION_COMPLETED','Беларусь','Беларусь'),
  ('Могилёв', '2017-05-22', '7',  '53.9006008','30.331133000000023','Коммунистический переулок','Гродно','2017-05-28','9','53.6694492','23.812581200000068','улица Зана','3759367',4,20000,489.494,'TRANSPORTATION_COMPLETED','Беларусь','Беларусь');



INSERT INTO check_point (description, latitude, longitude, path_date, way_bill)
VALUES
  ('ул. Доватора, Докшицы, Беларусь','54.89359040108592','27.74871826171875','2017-03-25',1),
  ('ул. Некрасова, 3, Псков, Псковская обл., Россия, 180000','57.81074874067238','28.33648681640625','2017-03-26',1),
  ('ул. Михайлова, 2, Великий Новгород, Новгородская обл., Россия, 173000','58.51306560486169','31.2835693359375','2017-03-27',1),
  ('Садовая ул., 16, Санкт-Петербург, Россия, 191186','59.93387500000001','30.33508299999994','2017-03-29',1),
  ('Świętojańska 19, Białystok, Польша','53.124319867401844','23.166046142578125','2017-04-21',2),
  ('Podchorążych 37, Warszawa, Польша','52.210131268181954','21.0443115234375','2017-06-23',2),
  ('E261, Poznań, Польша','52.35446457352601','16.887788772583008','2017-06-24',2),
  ('Karl-Liebknecht-Str. 7E, 10178 Berlin, Германия','52.52068999999999','13.40494000000001','2017-04-26',2),
  ('улица 30 лет ВЛКСМ, Борисов, Беларусь','54.22891539940191','28.519134521484375','2017-05-03',3),
  ('E30, Беларусь','53.514261076152074','26.676006317138672','2017-05-05',3),
  ('Р2, Беларусь','53.12274892574202','25.905590057373047','2017-05-07',3),
  ('ул. 17 Сентября, Кобрин, Беларусь','52.21617919424114','24.356346130371094','2017-05-08',3),
  ('ул. Комсомольская 10, Брест, Беларусь','52.09762139999999','23.734050300000035','2017-05-10',3),
  ('ул. Транспортная, Воложин, Беларусь','54.079332788893815','26.549835205078125','2017-05-22',4),
  ('проспект Победы, Лида, Беларусь','53.88117256399528','25.306320190429688','2017-05-26',4),
  ('ул. Зана 1, Гродно, Беларусь','53.6694492','23.812581200000068','2017-05-28',4);

INSERT INTO product (amount, name, invoice, product_state, lost_amount, lost_reason, lost_description, price)
VALUES
  (100,'Монитор',1,'LOST',5,'LOST','Потерял на заправке',200),
  (60,'Клавитура',1,'LOST',2,'STOLEN','Украли пока спал',70),
  (40,'Принтер',1,'DELIVERED',NULL,NULL,NULL,120),
  (5,'Молоко',2,'LOST',1,'SPOILED','Испортились по дороге',200),
  (4,'Хлеб',2,'LOST',1,'SPOILED','Испортилось по дороге',100),
  (100,'Огурцы',2,'DELIVERED',NULL,NULL,NULL,200),
  (20,'Молоко',3,'DELIVERED',NULL,NULL,NULL,5),
  (50,'Сок',3,'DELIVERED',NULL,NULL,NULL,2),
  (1000,'Мороженое',4,'DELIVERED',NULL,NULL,NULL,1);