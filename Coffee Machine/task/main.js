// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

class Speciality {
    name;
    price;
    water;
    milk;
    beans;
    constructor(name = "", price= 0, water = 0, milk = 0 , beans = 0) {
        this.name = name;
        this.price = price;
        this.water = water;
        this.milk = milk;
        this.beans = beans;
    }
}

class CoffeeMachine {
    money;
    water;
    milk;
    beans;
    cups;
    specialities;
    constructor(money = 0, water = 0, milk = 0, beans = 0, cups = 0, specialities = []) {
        this.money = money;
        this.water = water;
        this.milk = milk;
        this.beans = beans;
        this.cups = cups;
        this.specialities = specialities;
    }
    listSpecialities() {
        specialities.forEach((item, i) => {
            console.log(i + " - " + item.name)
        });
    }
    checkWater(speciality) {
        if ((this.water - speciality.water) < 0) {
            console.log("Sorry, not enough water!");
            return false;
        }
        return true;
    }
    checkMilk(speciality) {
        if ((this.milk - speciality.milk) < 0) {
            console.log("Sorry, not enough milk!");
            return false;
        }
        return true;
    }
    checkBeans(speciality) {
        if ((this.beans - speciality.beans) < 0) {
            console.log("Sorry, not enough beans!");
            return false;
        }
        return true;
    }
    checkCups() {
        if (this.cups <= 0) {
            console.log("Sorry, not enough cups!");
            return false;
        }
        return true;
    }
    checkResources() {
        return this.checkWater() && this.checkMilk() && this.checkBeans() && this.checkCups();
    }
    buySpeciality(choice){
        choice = Number(choice) - 1;
        if (this.checkResources(this.specialities[choice])) {
            this.water -= this.specialities[choice].water;
            this.milk -= this.specialities[choice].milk;
            this.beans -= this.specialities[choice].beans;
            this.money += this.specialities[choice].price;
            this.cups -= 1;
        }
    }
    fillMachine() {
        this.water += Number(input("Write how many ml of water you want to add:"));
        this.milk += Number(input("Write how many ml of milk you want to add:"));
        this.beans += Number(input("Write how many grams of coffee beans you want to add:"));
        this.cups += Number(input("Write how many disposable coffee cups you want to add:"));
    }
    takeMoney() {
        console.log(`I gave you \$${this.money}`);
        this.money = 0;
    }
    printRemaining() {
        console.log(`\nThe coffe machine has:
        ${this.water} ml of water
        ${this.milk} ml of milk
        ${this.beans} g of beans
        ${this.cups} disposable cups
        \$${this.money} of money\n`);
    }
}
const espresso = new Speciality("espresso",5, 250, 0, 16);
const blackCoffee = new Speciality("black coffee",6, 350, 0, 20);
const latte = new Speciality("latte",7, 350, 75, 20);
const cappuccino = new Speciality("cappuccino", 6, 200, 100, 12);
const specialities = [ espresso, latte, cappuccino, blackCoffee ];

let myMachine = new CoffeeMachine(550, 400, 540, 120, 9, specialities);

let action = "";
do {
    action = input("Write action (buy, fill, take, remaining, exit):");
    switch (action) {
        case "buy":
            console.log("What do you want to buy?")
            myMachine.listSpecialities();
            console.log("back - to main menu:")
            let choice = input();
            if (choice !== "back") {
                myMachine.buySpeciality(choice);
            }
            break;
        case "fill":
            myMachine.fillMachine();
            break;
        case "take":
            myMachine.takeMoney();
            break;
        case "remaining":
            myMachine.printRemaining();
            break;
        default:
            break;
    }
} while (action !== "exit");
