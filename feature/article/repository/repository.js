const Article = require("../model/model");
const { ArticleRepositoryInterface } = require("../entity/interface");
const { NotFoundError } = require("../../../utils/helper/response");
const {
  articleCoreToArticleModel,
  articleModelToArticleCore,
  listArticleModelToArticleCore,
} = require("../entity/mapping");

class ArticleRepository extends ArticleRepositoryInterface {
  constructor() {
    super();
    this.db = Article;
  }

  async createArticle(data) {
    const article = articleCoreToArticleModel(data);
    const createdArticle = await this.db.create(article);
    const articleCore = articleModelToArticleCore(createdArticle);
    return articleCore;
  }

  async getArticleById(id) {
    const article = await this.db.findByPk(id);
    if (!article) {
      throw new NotFoundError("Article not found");
    }
    const articleCore = articleModelToArticleCore(article);
    return articleCore;
  }

  async getAllArticle() {
    const articles = await this.db.findAll();
    const articleList = listArticleModelToArticleCore(articles);
    return articleList;
  }

  async updateArticleById(id, updatedData) {
    const articleModel = articleCoreToArticleModel(updatedData);
    const updatedArticle = await this.db.update(articleModel, {
      where: { id: id },
    });
    if (updatedArticle[0] === 0) {
      throw new NotFoundError("Article not found");
    }
    return articleModelToArticleCore(updatedArticle);
  }

  async deleteArticleById(id) {
    const deletedArticle = await this.db.destroy({
      where: { id: id },
    });
    if (deletedArticle === 0) {
      throw new NotFoundError("Article not found");
    }
    return true;
  }

  async getArticleByTitle(title) {
    const article = await this.db.findOne({
      where: { title: title },
    });
    if (!article) {
      throw new NotFoundError("Article not found");
    }
    const articleCore = articleModelToArticleCore(article);
    return articleCore;
  }
}

module.exports = ArticleRepository;
