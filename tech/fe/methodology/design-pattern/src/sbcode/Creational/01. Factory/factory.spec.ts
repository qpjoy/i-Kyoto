import BurgerFactory from "./burgerFactory";

const factory = new BurgerFactory();

const classicBurger = factory.createBurger("Veggie Burger");
classicBurger.prepare();
