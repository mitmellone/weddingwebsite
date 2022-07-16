// Require the framework and instantiate it
// const fastify = require('fastify')({ logger: true })
import mongodb from "@fastify/mongodb";
import fastifyCors from "@fastify/cors";
import fastify from "fastify";

const server = fastify();

server.register(mongodb, {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  
  url: 'mongodb+srv://mitmellone:S8P4O61xExgaF9iU@mitmellone-db.0t5rx.mongodb.net/weddingwebsite?retryWrites=true&w=majority'
});

server.register(fastifyCors, {
  origin: ["http://localhost:3000", "https://mellone-weddingwebsite-client.herokuapp.com/"]
})

// Declare a route
server.get('/', async (request, reply) => {
  return { hello: 'world' }
});

server.get('/guests', function(request, reply) {
  const guestCollection = this.mongo.db?.collection("guests");

  guestCollection?.find({}).toArray((err: unknown, guests: unknown) => {
    if (err) {
      reply.send(err);
    } else {
      reply.send(guests);
    }
  });
});

server.post('/guests', function(request, reply) {
  const guestCollection = this.mongo.db?.collection("guests");

  const record = request.body;

  if (!!record && typeof(record) === "object") {
    guestCollection?.insertOne(record, (err, result) => {
      if (err) {
        reply.send(err);
      } else {
        reply.send(result);
      }
    });
  }
})

// Run the server!
const start = async () => {
  try {
    await server.listen({ port: Number(process.env.PORT) || 3001, host: process.env.HOST || "0.0.0.0" })
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
start();
console.log("Server started")
