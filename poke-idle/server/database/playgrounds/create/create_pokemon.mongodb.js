/* global use, db */

use("pokeIdleDb");

db.createCollection("pokemon", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        base_experience: { type: "number" },
        height: { type: "number" },
        is_default: { type: "boolean" },
        order: { type: "number" },
        weight: { type: "number" },
        abilities: { bsonType: "array", items: { bsonType: "string" } },
        forms: { bsonType: "array", items: { bsonType: "string" } },
        game_indices: { bsonType: "array", items: { bsonType: "string" } },
        held_items: { bsonType: "array", items: { bsonType: "string" } },
        location_area_encounters: { type: "string" },
        moves: { bsonType: "array", items: { bsonType: "string" } },
        sprites: { type: "string" },
        cries: { type: "string" },
        species: { type: "string" },
        stats: {
          bsonType: "object",
          properties: {
            hp: { type: "number" },
            attack: { type: "number" },
            defense: { type: "number" },
            specialAttack: { type: "number" },
            specialDefense: { type: "number" },
            speed: { type: "number" },
          },
        },
        types: { bsonType: "array", items: { bsonType: "string" } },
      },
    },
  },
});

//db.pokemon.createIndex({ pokedexNumber: 1 }, { unique: true });
