import { Router } from "express";

const router = Router();

router.get("/new", (req, res) => {
  res.render("posts-new")
});

router.post("/new", (req, res) => {
    console.log(req.body)
})

export default router;
