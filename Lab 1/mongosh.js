use Employee

db.createCollection("Employee_Info")

db.Employee_Info.insertMany([
  {
    Emp_Id: 121,
    Emp_Name: "Alice",
    Designation: "Developer",
    Date_of_Joining: "2023-01-15",
    Salary: 50000,
    Dept_Name: "IT"
  },
  {
    Emp_Id: 122,
    Emp_Name: "Bob",
    Designation: "Analyst",
    Date_of_Joining: "2022-11-20",
    Salary: 45000,
    Dept_Name: "Finance"
  },
  {
    Emp_Id: 123,
    Emp_Name: "Charlie",
    Designation: "Manager",
    Date_of_Joining: "2021-06-01",
    Salary: 80000,
    Dept_Name: "HR"
  }
])

db.Employee_Info.updateOne(
  { Emp_Id: 121 },
  { $set: { Emp_Name: "Alice Smith", Dept_Name: "Engineering" } }
)

db.Employee_Info.find().sort({ Salary: 1 })

db.Employee_Info.updateMany(
  {},
  { $set: { Projects: [] } }
)

db.Employee_Info.updateOne(
  { Emp_Id: 121 },
  { $addToSet: { Projects: "AI Migration" } }
)
