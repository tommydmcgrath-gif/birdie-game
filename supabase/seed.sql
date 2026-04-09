-- Seed the holes table with Country Club of Fairfield course data
insert into holes (number, yards, par, stroke_index) values
  (1, 516, 5, 9),
  (2, 400, 4, 7),
  (3, 343, 4, 11),
  (4, 130, 3, 17),
  (5, 345, 4, 5),
  (6, 419, 4, 1),
  (7, 304, 4, 13),
  (8, 514, 5, 3),
  (9, 185, 3, 15),
  (10, 500, 5, 6),
  (11, 170, 3, 18),
  (12, 412, 4, 8),
  (13, 428, 4, 2),
  (14, 164, 3, 16),
  (15, 412, 4, 4),
  (16, 384, 4, 12),
  (17, 170, 3, 14),
  (18, 380, 4, 10)
on conflict (number) do nothing;
