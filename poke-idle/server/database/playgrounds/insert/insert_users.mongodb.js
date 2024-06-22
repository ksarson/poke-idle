/* global use, db */

use("pokeIdleDb");

db.users.insertOne({
  username: "test",
  passwordHash: "test",
  createdAt: new Date(),
  lastLogin: new Date(),
  level: 1,
  seen: ["bulbasaur", "charmander", "squirtle"],
  caught: ["charmander"],
  partner: "charmander",
  party: ["charmander"],
});
