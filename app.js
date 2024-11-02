const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());
const key = "secret key";

const users = [
  {
    id: 1,
    name: "srinadh",
    isAdmin: true,
  },
  {
    id: 2,
    name: "uday",
    isAdmin: false,
  },
];
const verify = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const Tokens = token.split(" ")[1];
    jwt.verify(Tokens, key, (err, value) => {
      if (err) {
        res.json({ message: "invalid token" });
      } else {
        req.user = value;
        next();
      }
    });
  } else {
    res.json("token needed");
  }
};
app.post("/login", (req, res) => {
  const { name, isAdmin } = req.body;
  const ele = users.find((user) => {
    return user.name === name && user.isAdmin === isAdmin;
  });

  if (ele) {
    const token = jwt.sign({ name: name, isAdmin: isAdmin,id:ele.id }, key);
    return res.json({ token, name, isAdmin, id:ele.id });
  } else {
    return res.json({ message: "invalid  user" });
  }
});

app.get("/getdata/:id", verify, (req, res) => {
    console.log(req.user.id===parseInt(req.params.id))
    console.log(typeof req.user.id, typeof req.params.id)
if(req.user.id===parseInt(req.params.id)||req.user.isAdmin)
    {
        res.json(users)
    }
    else
    {
        res.json("you do not have permission to delete that")
    }
});
app.listen(3000, console.log("its runnning here"));
