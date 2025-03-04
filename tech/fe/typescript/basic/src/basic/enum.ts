enum Week {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 55,
  Saturday = 6,
  Sunday = 7
}

console.log(Week.Monday);
console.log(Week["Monday"]);
console.log(Week[1]);
console.log(Week[55]);

enum WeekEnd {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday"
}

console.log(WeekEnd.Monday);
console.log(WeekEnd["Monday"]);

enum EnumAuditStatus {
  NO_ADUIT = 0,
  MANAGER_ADUIT_SUCCESS = 1,
  FINAL_ADUIT_SUCCESS = 2
}
type Expense = {
  id: number;
  events: string;
  time: Date;
  enumAuditStatus: EnumAuditStatus;
};

const Status = {
  NO_ADUIT: 0,
  MANAGER_ADUIT_SUCCESS: 1,
  FINAL_ADUIT_SUCCESS: 2
};
class MyAduit {
  getAduitStatus(status: number): void {
    if (status === Status.NO_ADUIT) {
      console.log("没有审核");
    } else if (status === Status.MANAGER_ADUIT_SUCCESS) {
      console.log("经理审核通过");
    } else if (status === Status.FINAL_ADUIT_SUCCESS) {
      console.log("财务审核通过");
    }
  }
}
const aduit = new MyAduit();
aduit.getAduitStatus(Status.NO_ADUIT);
export {};
