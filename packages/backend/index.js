"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Require the framework and instantiate it
// const fastify = require('fastify')({ logger: true })
const mongodb_1 = __importDefault(require("@fastify/mongodb"));
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)();
server.register(mongodb_1.default, {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    url: 'mongodb+srv://mitmellone:S8P4O61xExgaF9iU@mitmellone-db.0t5rx.mongodb.net/weddingwebsite?retryWrites=true&w=majority'
});
server.register(cors_1.default, {
    origin: ["http://localhost:3000"]
});
// Declare a route
server.get('/', async (request, reply) => {
    return { hello: 'world' };
});
server.get('/guests', function (request, reply) {
    var _a;
    const guestCollection = (_a = this.mongo.db) === null || _a === void 0 ? void 0 : _a.collection("guests");
    guestCollection === null || guestCollection === void 0 ? void 0 : guestCollection.find({}).toArray((err, guests) => {
        if (err) {
            reply.send(err);
        }
        else {
            reply.send(guests);
        }
    });
});
server.post('/guests', function (request, reply) {
    var _a;
    const guestCollection = (_a = this.mongo.db) === null || _a === void 0 ? void 0 : _a.collection("guests");
    const record = request.body;
    if (!!record && typeof (record) === "object") {
        guestCollection === null || guestCollection === void 0 ? void 0 : guestCollection.insertOne(record, (err, result) => {
            if (err) {
                reply.send(err);
            }
            else {
                reply.send(result);
            }
        });
    }
});
// Run the server!
const start = async () => {
    try {
        await server.listen({ port: 3001 });
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
console.log("Server started");
