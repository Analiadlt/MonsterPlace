const { Router } = require("express");
const { User } = require("../../db");
const router = Router();
const bcrypt = require("bcryptjs")

router.put("/putUserPassword", async (req, res) => {
    
  try {
    const rondasHash = 12
    const { email, password } = req.body;
    const updatePassword = await User.update({ password: await bcrypt.hash(password, rondasHash) },
        {where: {email: email}} );

    return res.status(200).send('Password Updated Successfully');

  } catch (e) {
    res.status(404).send('Put Password route problems');
  }
});

module.exports = router;
