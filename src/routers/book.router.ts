import express from "express";
import controller from "../controller/book.controller.js";
import upload from "../middlewares/upload.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { bookSchema } from "../validators/book.schema.js";

const router = express.Router();

router.post("/", validate(bookSchema), controller.createBook);
router.get("/", controller.getBooks);
router.get("/:id", controller.getBookById);
router.put("/:id",validate(bookSchema), controller.updateBook);
router.delete("/:id", controller.deleteBook);
router.post("/import", upload.single("file"), controller.importBooks);



export default router;