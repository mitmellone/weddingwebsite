// Require the framework and instantiate it
// const fastify = require('fastify')({ logger: true })
import mongodb from "@fastify/mongodb";
import fastifyCors from "@fastify/cors";
import fastify from "fastify";

const server = fastify({
  logger: true,
  pluginTimeout: 60000,
});

server.register(mongodb, {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  
  url: 'mongodb+srv://mitmellone:S8P4O61xExgaF9iU@mitmellone-db.0t5rx.mongodb.net/weddingwebsite?retryWrites=true&w=majority',
  connectTimeoutMS: 60000,
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
    console.log(`starting server on port ${process.env.PORT}, host: ${process.env.HOST}`)
    await server.listen({ port: parseInt(process.env.PORT || "8080"), host: process.env.HOST || "0.0.0.0" })
  } catch (err) {
    server.log.error(err);
    console.log(err)
    process.exit(1);
  }
}
start();
console.log("Server started")
