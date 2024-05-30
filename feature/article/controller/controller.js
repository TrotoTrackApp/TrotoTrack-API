const { articleRequest } = require("../dto/request");
const { articleResponse } = require("../dto/response");//added By Wisnu
const {
  successResponse,
  errorResponse,
  successWithDataResponse,
} = require("../../../utils/helper/response");
const {
  ValidationError,
  DuplicateError,
  NotFoundError,
  UnauthorizedError,
} = require("../../../utils/helper/response");

const { message } = require("../../../utils/constanta/constanta");

class ArticleController {
  constructor(articleService) {
    this.articleService = articleService;
  }

  async createArticle(req, res) { //Edited by wisnu
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        const data = articleRequest(req.body);
        const image = req.file;
        await this.articleService.createArticle(data, image);
        return res.status(201).json(successResponse(message.SUCCESS_CREATED));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async getArticleById(req, res) {
    const articleId = req.params.id;
    try {
      if (id === articleId) { 
        const article = await this.articleService.getArticleById(articleId);
        const response = articleResponse(article);
        return res.status(200).json(successWithDataResponse(message.SUCCESS_GET, response));
      } else {
        return res.status(404).json(errorResponse(message.ERROR_NOT_FOUND));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async getAllArticle(req, res) {//Edited by wisnu, *gatau req belum kepake disini bingung*)
    try {
      const article = await this.articleService.getAllArticle();
      const response = articleResponse(article);
      return res
          .status(200)
          .json(successWithDataResponse(message.SUCCESS_GET_ALL, response));
    }  catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      } else {
        console.log(error);
        return res
          .status(500)
          .json(errorResponse(message.ERROR_INTERNAL_SERVER));
      }
    }
  }

  async updateArticleById(req, res) { //Edited Wisnu
    const articleId = req.params.id;
    const data = articleRequest(req.body);
    try {
      const { id, role } = extractToken(req);
      if (role === "admin" || id === articleId) {
      await this.articleService.updateArticleById(articleId,data);
        return res.status(200).json(successResponse(message.SUCCESS_UPDATED));
      }else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof DuplicateError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      console.log(error);
      return res.status(500).json(errorResponse(message.ERROR_INTERNAL_SERVER));
    }
  }

  async deleteArticleById(req, res) { //Edited Wisnu
    const articleId = req.params.id;
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        await this.articleService.deleteArticleById(articleId);
        return res.status(200).json(successResponse(message.SUCCESS_DELETED));
      } else {
        return res.status(403).json(errorResponse(message.ERROR_FORBIDDEN));
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        return res.status(error.statusCode).json(errorResponse(error.message));
      }
      return res.status(500).json(errorResponse(message.ERROR_INTERNAL_SERVER));
    }
  }

  async getArticleByTitle(req, res) { //added by wisnu
    try {
      const title = req.params.title;
      const article = await this.articleService.getArticleByTitle(title);
      if (article) {
        const response = articleResponse(article);
        return res.status(200).json(successWithDataResponse(message.SUCCESS_GET_ALL, response));
      } else {
        return res.status(404).json(errorResponse(message.ERROR_NOT_FOUND));
      }
    } catch (error) {
      return res.status(500).json(errorResponse(message.ERROR_INTERNAL_SERVER));
    }
  }
}

module.exports = ArticleController;