//endpoints

import express from "express";
import * as authorsUsesCases from "../useCases/authors.use.js";
import { StatusHttp } from "../libs/statusHttp.js"; //DÒNDE SE UTILIZA?
import { auth } from "../middlewares/auth.js";

const router = express.Router();

//Routers o endpoints 

//GET /Authors 
router.get("/", async (request, response, next) => {
  try {
    const { page, limit } = request.query;
    const skip = (page - 1) * 10;

    const allAuthors = await authorsUsesCases
      .getAll()
      .populate({ path: "posts", select: ["title"] })
      .skip(skip)
      .limit(limit);
    response.json({
      succes: true,
      data: {
        authors: allAuthors,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GET /Authors /:id
router.get("/:idAuthor", async (request, response, next) => {
  try {
    const { idAuthor } = request.params;

    const getAuthor = await authorsUsesCases
      .getById(idAuthor)

    if (!idAuthor) {
      throw new StatusHttp("author not found", 401);
    }
    response.json({
      succes: true,
      data: {
        author: getAuthor,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//POST /Authors
router.post("/", async (request, response, next) => {
  try {
    const { body: newAuthor } = request;
    console.log(newAuthor.email);
    if (newAuthor.email) {
      throw new StatusHttp("This author already exist!");
    }
    const authorCreated = await authorsUsesCases.create(newAuthor);

    console.log(authorCreated);
    response.json({
      succes: true,
      message: "author created",
      data: authorCreated,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:idAuthor", auth, async (request, response, next) => {
  try {
    const { idAuthor } = request.params;
    const authorDeleted = await authorsUsesCases.deleteById(idAuthor);
    console.log(authorDeleted);
    if (!authorDeleted) {
      throw new StatusHttp("author no encontrado");
    }
    response.json({
      success: true,
      message: "author deleted",
      data: {
        author: authorDeleted,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:idAuthor", async (request, response, next) => {
  try {
    const { idAuthor } = request.params;
    const unUpdateAuthor = request.body;

    const authorUpdated = await authorsUsesCases.update(
      idAuthor,
      unUpdateAuthor
    );

    if (!unUpdateAuthor) {
      throw new StatusHttp("author not found");
    }
    response.json({
      succes: true,
      data: {
        author: authorUpdated,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
