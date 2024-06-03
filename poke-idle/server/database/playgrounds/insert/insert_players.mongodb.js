/* global use, db */

use("pokeIdleDb");

db.players.insertOne({
  username: "TheSavageSnipez",
  passwordHash: "hashed_password",
  createdAt: new Date(),
  lastLogin: new Date(),
  level: 1,
  seen: ["bulbasaur", "charmander", "squirtle"],
  caught: ["charmander"],
  party: ["charmander"],
});
