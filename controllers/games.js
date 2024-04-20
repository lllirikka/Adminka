const { readData, writeData } = require("../utils/data");

const getAllGames = async (req, res) => {
  const games = await readData("./data/games.json");
  if (!games) {
    res.status(400);
    res.send({
      sttaus: "error",
      message: "Нет игр в базе данных. Добавьте игру.",
    });
    return;
  }
  req.games = games;
  res.send(req.games);
};

const deleteGame = async (req, res) => {
  const games = await readData("./data/games.json");
  if (!games) {
    res.status(400);
    res.send({
      sttaus: "error",
      message: "Нет игр в базе данных. Добавьте игру.",
    });
    return;
  }
  req.games = games;
  const id = Number(req.params.id);
  req.game = req.games.find((item) => item.id === id);
  const index = req.games.findIndex((item) => item.id === req.game.id);
  req.games.splice(index, 1);
  await writeData("./data/games.json", req.games);
  res.send({
    games: req.games,
    updated: req.game,
  });
};

const addGame = async (req, res) => {
  const games = await readData("./data/games.json");
  if (!games) {
    res.status(400);
    res.send({
      sttaus: "error",
      message: "Нет игр в базе данных. Добавьте игру.",
    });
    return;
  }
  req.games = games;
  req.isNew = !Boolean(req.games.find((item) => item.title === req.body.title));
  if (req.isNew) {
    const inArray = req.games.map((item) => Number(item.id));
    let maximalId;
    if (inArray.lenght > 0) {
      maximalId = Math.max(...inArray);
    } else {
      maximalId = 0;
    }
    req.updatedObject = {
      id: maximalId + 1,
      title: req.body.title,
      image: req.body.image,
      link: req.body.link,
      description: req.body.description,
    };
    req.games = [...req.games, req.updatedObject];
  } else {
    res.status(400);
    res.send({ stutus: "error", message: "Игра с таким именем уже есть." });
    return;
  }
  await writeData("./data/games.json", req.games);
  res.send({
    games: req.games,
    updated: req.updatedObject,
  });
};

module.exports = { getAllGames, deleteGame, addGame };
