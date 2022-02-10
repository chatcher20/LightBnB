INSERT INTO users (name, email, password)
VALUES ('Matthew', 'matthew@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Mark', 'mark@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Luke', 'luke@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1,'Lakeshore','nice lake prop', 'google.ca/img.jpg', 'google.ca/img2.jpg', 200000, 2, 6, 3, 'Canada', '23 bayview Dr SW', 'Kelowna', 'BC', 'V8S 0X1', TRUE), 
  (2,'DIRTshore','Not nice dirt prop', 'google.ca/img.jpg', 'google.ca/img2.jpg', 200, 2, 6, 3, 'Canada', '99 Dirt Dr SW', 'Edmonton', 'AB', 'T9D 0C1', TRUE), 
  (3,'WEALTHY MANOR','Too expensive for you', 'google.ca/img.jpg', 'google.ca/img2.jpg', 200000000, 9, 600, 32, 'United States', '23 GreatView Dr SW', 'Dallas', 'TX', '28931', TRUE);


INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (4, 1, 1, 2, 'Not too shabby.'),
 (4, 2, 2, 5, 'Really nice!'),
 (4, 3, 3, 1, 'Welcome, Master Wayne.');