function User(firstName: string, lastName: string, age: number, gender: string): any {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}
User.prototype.emailDomain = "@facebook.com";

User.prototype.getEmailAddress = function () {
  return this.firstName + this.lastname + this.emailDomain;
};
const user: any = new (User as any)("John", "Smith", 25, "male");
console.log(`[user]: `, user, user.__proto__, user.getEmailAddress());
