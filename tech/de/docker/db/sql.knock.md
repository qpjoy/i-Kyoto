```sql
-- SELECTS ALL THE STUDENTS
SELECT * FROM students

-- SELECT ONLY THE ID OF THE STUDENT
SELECT id, first_name, last_name from students

-- SELECT ALL THE STUDENTS AND A COLUMN CALLED type=student
SELECT *, 'students' as type from students

-- ORDER BY
-- GET ALL THE STUDENTS BUT ORDER THEM BY THEIR AGE IN INCREASING ORDER
SELECT * FROM students ORDER BY age ASC
SELECT * FROM students ORDER BY age DESC

-- select the first 5 oldest students
SELECT * FROM students ORDER BY age DESC LIMIT 5 OFFSET 5

-- WHERE
-- = <> > < >=
-- select the student which has an id of st_1
SELECT * FROM students WHERE id = 'st_1'

-- select the students which are older than 25
SELECT * FROM students WHERE age > 25

-- IS NULL
-- select the students which have last names as null
SELECT * FROM students where last_name is NULL

SELECT * FROM students where last_name is NOT NULL

-- SELECT students which have the name Matt and older than 23
select * from students where students.first_name = 'Matt' AND students.age > 23
select * from students where students.first_name = 'Matt' OR students.age > 23

-- NOT
-- select the students which don't have the name 'Tom'
select * from students where NOT(students.first_name = 'Tom')
select * fom students where last_name IS NOT NULL AND NOT()

-- BETWEEN
-- SELECT all the students which are between 21 and 25
select * from students where age >= 21 and age <= 25
select * from students where age between 21 AND 25

-- IN
-- select all the students which are 18, 25, or 27 years old
select * from students where age = 18 or age = 26 or age = 27
select * from student where age IN(18,26,27)

select * from students where age = SOME(Array(18,25,27))

-- COLUMN alias
select first_name AS name FROM students

-- TABLE alias
select * from students AS st where st.age between 21 and 25

-- EXISTS
-- select all the names of the student which exists inside the instructor names
select first_name from students where EXISTS(select * from "Instructors" where "Instructors".first_name = students.first_name)

-- DISTINCT
-- select all the unique names of the students
select distinct(first_name) from students

-- like
-- select all the students which start with the letter
select * from students where first_name like '%R%'

-- case when
-- level is column name
select *,
case when age > 21 then 'senior'
else 'junio' end level
from students

-- get all the first name of the students but in uppercase
select UPPER(first_name) from students
select LOWER(first_name) from students

-- select the ids of the students but the first letter capitalized
select initcap(id) from students

-- concat
-- get all full names of the students
select concat(first_name, '', last_name, ' ->') as full_name from students

-- left
-- get the first 3 letters of the students
select LEFT(first_name, 3) AS short_name from students

-- right
-- get the last 3 letters of the students
select RIGHT(first_name, 3) AS short_name from students

-- substr
-- get the 2nd till 4rd characters of the students
select substr(first_name, 2,4) from students

-- length
-- get the id of the students and show how many letters of first names do they have
select id, length(first_name) AS number_of_letters FROM students

-- Order the sudents by their first names
select * from students order by length(first_name) ASC

-- replace
-- get the ids of the students but in STU format
select replace(id, 'st', 'STU') from students

-- CAST.select the length of the age of the students
select length(CAST(age AS VARCHAR)) from students

-- TRIM
-- LTRIM RTRIM TRIM
-- get all the students first names but their first name to be trimmed
select RTRIM(first_name) from students

-- split_part
select split_part("example1, example2, example3", ",", 2）

-- AGGREGATES
-- SUM COUNT AVG
-- select the minimum age of the students
select MIN(age) AS minimun_age from students

-- select the maximum age of the students
select MAX(age) AS maximum_age from students

-- select the sum  of the age of the students.
select SUM(age) from students

-- AVG
-- select the average age of the students
select AVG(age) AS average_age from students

-- COUNT
-- select the number of students
select COUNT(*) from students

select COUNT(*) from students
where students.first_name = 'Matt'

-- FILTER
-- get me the count of students between ages of 18 and 21, 22-25, 25-30
select
    count(*) FILTER(where age between 18 and 21)
    count(*) FILTER(where age between 22 and 25)
    count(*) FILTER(where age between 26 and 30)
from students

-- GROUP BY
-- select all distinct ages
select distinct(age) from students
select age from students group by age
-- select how many students there per age group
select age, count(*) from students group by age

-- multiple group by
select first_name, last_name, count(*) from students
group by first_name, last_name

-- having
-- get the ages of the student where are more than 1 instance
select age, count(*) from students group by age having count(*)>1

-- OVER
-- select all the student as well as the average age of the students
select *, AVG(age) over() from students

-- JOINS
-- UNION
-- get all the names of  students/instructors
select first_name * from students
UNION
select first_name from "Instructors"

-- UNION ALL (keep duplicate)
select first_name * from students
UNION ALL
select first_name from "Instructors"

-- LEFT JOIN
-- select all the course registrations but also include the student name
select student_id, first_name from course_registration
left join students ON students.id = course_registrations.student_id

select id, first_name, course_id
from students
left join course_registrations  on students.id = course_registrations.student_id

select id, first_name, course_id
from students
left join course_registrations  on students.id = course_registrations.student_id
where course_id is not null

-- INNTER JOIN remove
select id, first_name, course_id
from students
INNER join course_registrations on students.id = course_registrations.student_id

-- CURRENT DATE
-- get all the course registration and the current date and a separate column
select *, now() as current_date from course_registrations
select now()

-- TIMEZONES
select registration_date from course_registrations;
-- get all the registration date in los angeles timezone; "New_York"
select registration_date at time zone 'Ameraca/Los_Angeles' from course_registrations

-- EXTRACT, Get all the course registration but show the month and the year only
select student_id, course_id,
    extract("MONTH" from registration_date) as month,
    extract("YEAR" from registration_date) as year
from course_registrations

-- DATE_PART
select student_id, course_id,
    date_part("year" from registration_date) as year,
    date_part("month" from registration_date) as month
from course_registrations

-- DATE_TRUNC
-- round down the hour of the registration date.
select student_id, course_id, date_trunc('hour', registration_date)
from course_registrations

select student_id, course_id, date_trunc('day', registration_date)
from course_registrations

-- DATE difference
select now() - registration_date from course_registrations;
select date_part('days', now() - registration_date) from course_registrations;
select date_part('hours', now() - registration_date) from course_registrations;

-- AGE
-- get me all the ages of the students
select AGE(date_of_birth) from students;

-- TO_CHAR
-- yyyy/mm/dd
select to_char(registration_date, 'YYYY/MM/DD') from course_registrations;
select to_char(registration_date, 'MM DD YYYY') from course_registrations;
select to_char(registration_date, 'DD Mon, YYYY') from course_registrations;

-- TO_DATE
-- TO_TIMESTAMP
select to_date('28 Jan, 2023', 'DD Mon, YYYY')
select to_timestamp('28 Jan, 2023', 'DD Mon, YYYY')

-- INTERVAL
-- GET THE DATE OF TOMORROW
select now() + INTERVAL '1 day'
select now() - INTERVAL '1 day'
-- GET THE DATE OF next week
select now() + INTERVAL '7 day'
-- GET THE DATE OF next month
select now() + INTERVAL '1 month'

-- make interval
-- add 1 month, 1 week, and 1 day to now
select now() + make_interval(month=>1, weeks=>1, days=>1)

-- the course registrations expire in 2 months and 2 weeks, give me all the expiry dates.
select registration_date + make_interval(months=>2, weeks=>2)
from course_registrations

-- JSON
select meta_data from students
select meta_data ->> 'address' from students
select * from students
where meta_date ->> 'address' = 'random_address'
-- sub property of json
select meta_date -> 'school' ->> 'name' from students

-- JSON AGGREGATES
-- get all the students with their list of courses in 1 row
select student_id, json_agg(course_id) from course_registrations group by student_id
select student_id, array_agg(course_id) from course_registrations group by student_id

-- json_build_object
-- select the ages of the students and a list of students that belong to that
select age, json_agg(json_build_object('id', id, 'name', students.first_name)) from student group by age

-- ARRAY
-- UNNEST
-- get all the grades of the students in separate rows
select student_id, couse_id, unnest(grades) from course_registrations
-- SLICING
-- get the first grades of all the students
select student_id, course_id, grades[1:2] from course_registrations

-- ARRAY_APPEND
-- get all the grades of the students and add a 0 at the end
select student_id, course_id, array_append(grades, 0) from course_registrations

-- ARRAY_LENGTH
-- get the number of grades for each course registration
select *, array_length(grades, 1) from course_registrations

-- SEARCH AN ARRAY
select * from course_registrations where 80 = any(grades)
-- get all the students which the first grade was 70
select * from course_registration where grades[1] = 70

-- get all the courses with their list of students
select course_id, array_agg(student_id) from course_registrations
group by course_id

-- string_to_array
select string_to_array('element1, element2,element3', ',')
select unnest(string_to_array('element1, element2,element3', ','))

-- WINDOW FUNCTIONS
-- ROW_NUMBER
select *, row_number() over() from course_registrations

-- oldest should begin from 1
select *, row_number() over(
    ORDER BY registration_date DESC
) from course_registrations

-- PARTITIOn
select *, row_number() over(
    PARTITION BY student_id
    ORDER BY registration_date DESC
) from course_registrations
-- NTILE
select *, ntile(2) over()
from course_registrations

-- CRUD DATABASES
CREATE DATABASE University
ALTER DATABASE University RENAME TO UniversityNew
ALTER DATABASE University New RENAME To University
DROP DATABASE University

-- CRUD tables
CREATE TABLE students(
    id varchar primary key,
    first_name varchar,
    last_name varchar,
    meta_data json,
    age int
)
DROP Table students;
ALTER TABLE students RENAME TO students1;

-- ADD/RENAME/DROP COLUMNS
ALTER TABLE students
ADD COLUMN additional_info json,
ADD COLUMN date_of_birth date

ALTER TABLE students
RENAME additional_info TO additional_info_new
ALTER TABLE students DROP COLUMN additional_info_new
ALTER TABLE students DROP COLUMN date_of_birth

-- COLUMN ATTRIBUTES
ALTER TABLE students ADD COLUMN age int DEFAULT 18

-- COLUMN NOT NULL
ALTER TABLE students ADD COLUMN age int DEFAULT 18 NOT NULL

-- UNIQUE
ALTER TABLE students
ADD COLUMN first_name varchar QUNIQUE

-- CHECK
ALTER TABLE students ADD COLUMN age int CHECK(age>18)

-- PRIMARY ADD/REMOVE (UNIQUE auto generate primary key)
ALTER TABLE students DROP CONSTRAINT students_pkey
ALTER TABLE students ADD CONSTRAINT students_pkey PRIMARY KEY(id)

-- COMPOUND PRIMARY KEYS
ALTER TABLE students DROP CONSTRAINT students_pkey
ALTER TABLE students ADD CONSTRAINT students_pkey PRIMARY_KEY(first_name, last_name)

-- FOREIGN, ADD/REMOVE
CREATE TABLE courses(
    id varchar primary key,
    description varchar,
)

CREATE TABLE course_registrations(
    course_id varchar,
    student_id varchar,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    registration_date timestamptz
)

ALTER TABLE course_registrations
DROP CONSTRAINT course_registrations_course_id_fkey

-- ON DELETE
-- CASCADE, SET NULL, RESTRICT
-- CASCADE
ALTER TABLE course_registrations
ADD CONSTRAINT course_registraions_course_id_fkey
FOREIGN KEY (course_id) REFERENCES courses(id)
ON DELETE CASCADE

-- setnull
ALTER TABLE course_registrations
ADD CONSTRAINT course_registraions_course_id_fkey
FOREIGN KEY (course_id) REFERENCES courses(id)
ON DELETE SET NULL

-- restrict
ALTER TABLE course_registrations
ADD CONSTRAINT course_registraions_course_id_fkey
FOREIGN KEY (course_id) REFERENCES courses(id)
ON DELETE RESTRICT

-- INDEXES
CREATE INDEX first_name_index ON students(first_name)
DROP INDEX first_name_index


-- IF NOT EXISTS
CREATE TABLE IF NOT EXISTS Test(id varchar)

-- CRUD ROWS
INSERT INTO students
VALUES('st_3', 'random', 'null', 'matt', 21)

INSERT INTO students(id, first_name, last_name)
VALUES('st_4', 'Jacob', 'Macaw')

UPDATE students SET age = 0 WHERE age IS NULL
DELETE FROM students WHERE age = 0

-- INSERT MULTIPLE
INSERT INTO students(id, first_name, last_name)
VALUES
('st_4', 'Jacob', 'Macaw'),
('st_5', 'Jacob1', 'Macaw')
('st_6', 'Jacob2', 'Macaw')

-- onConflict
INSERT INTO students(id, first_name, last_name)
VALUES('st_4', 'Jacob', 'Macaw')

-- DO NOTHING
INSERT INTO students(id, first_name, last_name)
VALUES('st_4', 'Jacob', 'Macaw')
ON CONFLICT(id)
DO NOTHING

-- conflict id  UPDATE excluded content
INSERT INTO students(id, first_name, last_name)
VALUES('st_4', 'Jacob', 'Macaw')
ON CONFLICT(id)
DO UPDATE SET
first_name = excluded.first_name,
last_name = excluded.last_name

-- TRANSACTIONS
BEGIN;

INSERT INTO students(id, first_name, last_name)
VALUES('st_5', 'X', 'Y')
INSERT INTO students(id, first_name, last_name)
VALUES('st_5', 'X', 'Y')

ROLLBACK;

INSERT INTO students(id, first_name, last_name)
VALUES('st_5', 'X', 'Y')

COMMIT;

-- GREATEST
SELECT GREATEST(1,4,9,13,2,6,7)
-- LEST
SELECT LEAST(3,2,1);

-- nested queries
SELECT * FROM students
WHERE  age > (SELECT AVG(age) FROM students)

-- COALESCE
SELECT id, first_name, coalesce(last_name, 'N/A') AS last_name, meta_data, age from students;

-- EXCEPT
SELECT first_name FROM  students
EXCEPT
SELECT first_name FROM "Instructors"

-- CTE
-- get the youngest student older than the average age of the students
-- SELECT AVG(age) as average_age FROM students
WITH CTE AS (
    SELECT * FROM students WHERE age > (SELECT AVG(age) FROM students)
)
SELECT * FROM CTE
ORDER BY age ASC
LIMIT 1


-- GENERATE_SERIES
SELECT generate_series(1, 100)
-- jump by 2
SELECT generate_series(1, 100, 2)

-- generate series date
SELECT generate_series('2020/01/01'::date, '2020/02/01':date, '1 day');
SELECT generate_series('2020/01/01'::date, '2020/02/01':date, '1 month');
SELECT generate_series('2020/01/01'::date, '2020/02/01':date, '1 week');
```
