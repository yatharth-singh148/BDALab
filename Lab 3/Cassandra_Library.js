CREATE KEYSPACE Library
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE Library;

CREATE TABLE Library_Info (
    Stud_Id INT PRIMARY KEY,
    Counter_value COUNTER,
    Stud_Name TEXT,
    Book_Name TEXT,
    Book_Id INT,
    Date_of_issue DATE
);

INSERT INTO Library_Info (Stud_Id, Stud_Name, Book_Name, Book_Id, Date_of_issue)
VALUES (112, 'Rahul', 'BDA', 501, '2025-04-01');

UPDATE Library_Info
SET Counter_value = Counter_value + 1
WHERE Stud_Id = 112;

SELECT * FROM Library_Info WHERE Stud_Id = 112;
