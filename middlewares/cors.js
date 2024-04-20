const cors = (req, res, next) => {
  const { origin } = req.header;
  const allowedCors = [
    "localhost:3000",
    "https://practicum.yandex.ru",
    "https://students-projects.ru",
  ];
  if (allowedCors.includes(origin)) {
    res.header("Acces-Control-Allow-Origin", origin);
  }
  next();
};

module.exports = cors;
