import { Router } from "express";
const user = require("../controllers/user.controller.js");

const router = Router();

// routes here
router.get("/:id", user.getUser);

router.post("/create", user.createUser);

router.put("/update/:id", user.updateUser);

router.delete("/delete", user.deleteUser);

export default router;
