// ESM
import Fastify from "fastify";
import fastifyMongooseAPI from "fastify-mongoose-api";
import fastifyCors from "@fastify/cors";
import mongoose from "mongoose";
import { config } from "./config.js";
import { initializeModels } from "./models/index.js";

const fastify = Fastify({
  logger: true
});

fastify.register(fastifyCors, {
  origin: [
    "http://localhost:3000",
    "http://mellone-weddingwebsite-client.herokuapp.com",
    "https://mellone-weddingwebsite-client.herokuapp.com"
  ]
});

async function initializeDatabase() {
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://${config.db.username}:${config.db.password}@${config.db.host}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: true,
        dbName: config.db.name,
      }
    );

    initializeModels(connection);

    fastify.register(fastifyMongooseAPI, {
      models: connection.models,
      prefix: '/',
      setDefaults: true,
      methods: ['list', 'get', 'post', 'delete', 'put', 'patch'],
    });
  } catch(err) {
    fastify.log(err);
    process.exit(1);
  }
}

async function start() {
  try {
    await initializeDatabase();

    // Run the server!
    fastify.listen({ port: parseInt(process.env.PORT || "3001"), host: process.env.HOST || "0.0.0.0" }, function (err, address) {
      if (err) {
        fastify.log.error(err)
        process.exit(1)
      }
      // Server is now listening on ${address}
    });
  } catch (err) {
    fastify.log(err);
    process.exit(1);
  }
}
start();
