CREATE KEYSPACE Employee
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE Employee;

CREATE TABLE Employee_Info (
    Emp_Id INT PRIMARY KEY,
    Emp_Name TEXT,
    Designation TEXT,
    Date_of_Joining DATE,
    Salary INT,
    Dept_Name TEXT
);

BEGIN BATCH
INSERT INTO Employee_Info VALUES (101, 'John', 'Manager', '2020-01-10', 50000, 'HR');
INSERT INTO Employee_Info VALUES (102, 'Alice', 'Engineer', '2021-02-15', 40000, 'IT');
APPLY BATCH;

UPDATE Employee_Info
SET Emp_Name = 'John Doe', Dept_Name = 'Finance'
WHERE Emp_Id = 101;

SELECT * FROM Employee_Info;

ALTER TABLE Employee_Info ADD Projects SET<TEXT>;

UPDATE Employee_Info
SET Projects = {'ProjectA', 'ProjectB'}
WHERE Emp_Id = 101;

UPDATE Employee_Info
SET Projects = {'ProjectA', 'ProjectB'}
WHERE Emp_Id = 101;

INSERT INTO Employee_Info (Emp_Id, Emp_Name)
VALUES (103, 'TempUser')
USING TTL 15;
