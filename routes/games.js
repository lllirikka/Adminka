const gamesRouter = require("express").Router();

const getAllGames = async (req, res) => {};

const deleteGame = async (req, res) => {};

const addGame = async (req, res) => {};

gamesRouter.get("/games", getAllGames);
gamesRouter.delete("/games/:1", deleteGame);
gamesRouter.post("/games", addGame);

module.exports = gamesRouter;
