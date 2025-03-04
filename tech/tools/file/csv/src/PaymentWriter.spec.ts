import { CSVWriter } from ".";

interface Payment {
  id: number;
  amount: number;
  to: string;
  notes: string;
}

const paymentWriter = new CSVWriter<Payment>(["id", "amount", "to", "notes"]);

paymentWriter.addRows([
  {
    id: 1,
    amount: 100,
    to: "John Doe",
    notes: "Payment for project X"
  },
  {
    id: 2,
    amount: 500,
    to: "Jane Doe",
    notes: "Payment for project Y"
  }
]);

paymentWriter.save("./data/payments.csv");
