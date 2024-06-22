/* global use, db */

use("pokeIdleDb");

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "username",
        "passwordHash",
        "createdAt",
        "lastLogin",
        "level",
        "seen",
        "caught",
        "partner",
        "party",
      ],
      properties: {
        username: {
          bsonType: "string",
          description: "Username of the player",
        },
        passwordHash: {
          bsonType: "string",
          description: "Hashed password of the player",
        },
        createdAt: {
          bsonType: "date",
          description: "Date when the player account was created",
        },
        lastLogin: {
          bsonType: "date",
          description: "Date when the player last logged in",
        },
        level: {
          bsonType: "int",
          minimum: 1,
          description: "Level of the player",
        },
        seen: {
          bsonType: "array",
          items: {
            bsonType: "string",
          },
          description: "Array of Pokémon names that the player has seen",
        },
        caught: {
          bsonType: "array",
          items: {
            bsonType: "string",
          },
          description: "Array of Pokémon names that the player has caught",
        },
        partner: {
          bsonType: "string",
          description: "Name of the player's partner pokemon",
        },
        party: {
          bsonType: "array",
          items: {
            bsonType: "string",
          },
          description: "Array of Pokémon names in the player's party",
        },
      },
    },
  },
});

db.users.createIndex({ username: 1 }, { unique: true });
