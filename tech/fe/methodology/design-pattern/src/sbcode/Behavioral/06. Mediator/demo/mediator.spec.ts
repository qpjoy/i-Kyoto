import Component from "./component";
import Mediator from "./mediator";

const mediator = new Mediator();
const component1 = new Component(mediator, "Component1");
const component2 = new Component(mediator, "Component2");
const component3 = new Component(mediator, "Component3");

mediator.add(component1);
mediator.add(component2);
mediator.add(component3);

component1.notify("data A");
component2.notify("data B");
component3.notify("data C");
