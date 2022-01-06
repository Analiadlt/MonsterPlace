const { Router } = require("express");
const { User } = require("../../db");
const router = Router();

router.put("/putUserPassword", async (req, res) => {
    
  try {
    const { email, password } = req.body;
    const updatePassword = await User.update({ password },
        {where: {email: email}} );

    return res.status(200).send('Password Updated Successfully');

  } catch (e) {
    res.status(404).send('Put Password route problems');
  }
});

module.exports = router;
