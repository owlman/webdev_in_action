const func = require(`./functions`);
    const data = require(`./data`);
    const bat = {
        name : data.name,
        age  : data.age,
        sayHello : func.sayHello
    };

    module.exports = bat;
    