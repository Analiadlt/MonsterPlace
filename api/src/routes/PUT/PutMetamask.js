const { Router } = require("express");
const { User } = require("../../db");
const router = Router();

router.put("/", async (req, res) => {
  const { metamaskAccount, email } = req.body;
  try {
    let response = await User.update(
      { metamaskAccount },
      {
        where: {
          email: email,
        },
      }
    );
    res.send(response);
  } catch (error) {
    res.send("Error al loguear usuario");
  }
});

module.exports = router;
