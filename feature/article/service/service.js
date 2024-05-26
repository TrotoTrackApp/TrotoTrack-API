const { ArticleServicesInterface } = require("../entity/interface");
const {
  ValidationError,
  NotFoundError,
} = require("../../../utils/helper/response");
const validator = require("validator");

class ArticleService extends ArticleServicesInterface {
  constructor(articleRepo) {
    super();
    this.articleRepo = articleRepo;
  }

  async createArticle(data) {
    // Validate required fields
    if (!data.title || !data.description || !data.image) {
      throw new ValidationError(message.ERROR_REQUIRED_FIELD);
    }

    // Validate title length
    if (data.title.length < 5) {
      throw new ValidationError("Title must be at least 5 characters long");
    }

    // Validate description length
    if (data.description.length < 10) {
      throw new ValidationError(
        "Description must be at least 10 characters long"
      );
    }

    // Check if title is already exist
    const titleExist = await this.articleRepo.getArticleByTitle(data.title);
    if (titleExist) {
      throw new ValidationError("Title already exist");
    }

    const article = await this.articleRepo.createArticle(data);
    return article;
  }

  async getArticleById(id) {
    if (!id) {
      throw new ValidationError("Id is required");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }

    const article = await this.articleRepo.getArticleById(id);
    return article;
  }

  async getAllArticle() {
    const article = await this.articleRepo.getAllArticle();
    if (article.length === 0) {
      throw new ValidationError("No article found");
    }
    return article;
  }

  async updateArticleById(id, updated) {
    // Validate required fields
    if (!data.title || !data.description || !data.image) {
      throw new ValidationError(message.ERROR_REQUIRED_FIELD);
    }

    // Validate title length
    if (data.title.length < 5) {
      throw new ValidationError("Title must be at least 5 characters long");
    }

    // Validate description length
    if (data.description.length < 10) {
      throw new ValidationError(
        "Description must be at least 10 characters long"
      );
    }

    // Check if title is already exist
    const titleExist = await this.articleRepo.getArticleByTitle(data.title);
    if (titleExist) {
      throw new ValidationError("Title already exist");
    }

    const article = await this.articleRepo.updateArticleById(id, updated);
    return article;
  }

  async deleteArticleById(id) {
    if (!id) {
      throw new ValidationError("Id is required");
    }

    if (!validator.isUUID(id)) {
      throw new ValidationError(message.ERROT_ID_INVALID);
    }
    
    const article = await this.articleRepo.deleteArticleById(id);
    return article;
  }
}
