import { CSVWriter } from ".";

interface Employee {
  id: number;
  name: string;
  role: string;
  salary: number;
}

const employeeWriter = new CSVWriter<Employee>(["id", "name", "role", "salary"]);

employeeWriter.addRows([
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    salary: 100000
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Data Scientist",
    salary: 150000
  }
]);

employeeWriter.save("./data/employees.csv");
