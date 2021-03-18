const bunyan = require("bunyan");
// const log = bunyan.createLogger({ name: "myapp" });
// log.info("hi");
// log.warn({ lang: "fr" }, "au revoir");

const log = bunyan.createLogger({
    name: "jack",
    level: 'trace',
    // stream: '',
    // streams: '',
    // serializers: '',
    // src: true,
})

log.info('hello world')