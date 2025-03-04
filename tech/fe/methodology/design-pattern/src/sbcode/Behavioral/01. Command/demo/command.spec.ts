import Light from "./light";
import Switch from "./switch";
import SwitchOnCommand from "./switchOnCommand";
import SwitchOffCommand from "./switchOffCommand";

const light = new Light();

const switchOn = new SwitchOnCommand(light);
const switchOff = new SwitchOffCommand(light);

const _switch = new Switch();
_switch.register("ON", switchOn);
_switch.register("OFF", switchOff);

_switch.execute("ON");
_switch.execute("OFF");
_switch.execute("ON");
_switch.execute("OFF");

_switch.showHistory();
_switch.replayLast(2);
