const tools = require(`./tools`);
console.log(tools.add(4,5));      // 输出：9

const Hero = require(`./hero`);
const owl = new Hero('owlman');
owl.sayhello();           // 输出：Hello owlman

const bat = require(`./batman`);
bat.sayHello();          // 输出： batman：45
  