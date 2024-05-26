const { articleRequest } = require("../dto/request");
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

  async createArticle(req, res) {
    try {
      const { id, role } = extractToken(req);
      if (role === "admin") {
        const data = articleRequest(req.body);
        await this.articleService.createArticle(data);
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
    try {
      const article = await this.articleService.getArticleById(req.params.id);
      res.status(200).json(article);
    } catch (error) {
      
    }
  }

  async getAllArticle(req, res) {
    try {
      const article = await this.articleService.getAllArticle();
      res.status(200).json(article);
    } catch (error) {
      
    }
  }

  async updateArticleById(req, res) {
    try {
      const article = await this.articleService.updateArticleById(
        req.params.id,
        req.body
      );
      res.status(200).json(article);
    } catch (error) {
      
    }
  }

  async deleteArticleById(req, res) {
    try {
      await this.articleService.deleteArticleById(req.params.id);
      res.status(204).end();
    } catch (error) {
      
    }
  }
}
