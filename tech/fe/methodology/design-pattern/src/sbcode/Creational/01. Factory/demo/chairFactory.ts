import SmallChair from "./smallChair";
import MediumChair from "./mediumChair";
import BigChair from "./bigChair";
import IChair from "./chair";

export default class ChairFactory {
  static getChair(chair: string): IChair {
    if (chair == "BigChair") {
      return new BigChair();
    } else if (chair == "MediumChair") {
      return new MediumChair();
    } else {
      return new SmallChair();
    }
  }
}
