import express from "express";
import controller from "../controller/book.controller.js";
import multer from "multer";
import { validate } from "../middlewares/validate.middleware.js";
import { bookSchema } from "../validators/book.schema.js";

const router = express.Router();
const upload = multer();

router.post("/", validate(bookSchema), controller.createBook);
router.get("/", controller.getBooks);
router.get("/:id", controller.getBookById);
// router.put("/:id", controller.updateBook);
// router.delete("/:id", controller.deleteBook);
// router.post("/import", upload.single("file"), controller.importBooks);



export default router;