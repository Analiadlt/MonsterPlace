const { Router } = require("express");
const { User } = require("../../db");

const router = Router();

router.post("/", async (req, res) => {
  const { metamaskAccount } = req.body;
  const info = await User.findAll({
    where: { metamaskAccount: metamaskAccount },
    attributes: {
      exclude: [
        "password",
        "createdAt",
        "updatedAt",
        "dateBirth",
        "token",
        "id",
      ],
    },
  });
  try {
    res.status(200).send(info);
  } catch (error) {
    res.status(400).send("No se encontro usuario");
  }
});

module.exports = router;
