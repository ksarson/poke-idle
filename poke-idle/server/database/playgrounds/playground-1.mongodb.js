/* global use, db */

use("pokeIdleDb");
const collectionName = "users";

db.getCollection(collectionName).updateOne(
  { username: "testt" },
  { $set: { caught: ["charmander"] } }
);
