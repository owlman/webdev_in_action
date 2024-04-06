class Hero {
    constructor(name) {
        this.name = name;
    }

    sayhello() {
        console.log('Hello', this.name);
    }
}

module.exports = Hero;
