class ArticleRepositoryInterface {
  async createArticle(data, file) {
    throw new Error("Method not implemented");
  }

  async getArticleById(id) {
    throw new Error("Method not implemented");
  }

  async getAllArticle() {
    throw new Error("Method not implemented");
  }

  async updateArticleById(id, updatedData) {
    throw new Error("Method not implemented");
  }

  async deleteArticleById(id) {
    throw new Error("Method not implemented");
  }

  async getArticleByTitle(title) {
    throw new Error("Method not implemented");
  }
}

class ArticleServicesInterface {
  async createArticle(data, file) {
    throw new Error("Method not implemented");
  }

  async getArticleById(id) {
    throw new Error("Method not implemented");
  }

  async getAllArticle() {
    throw new Error("Method not implemented");
  }

  async updateArticleById(id, updatedData) {
    throw new Error("Method not implemented");
  }

  async deleteArticleById(id) {
    throw new Error("Method not implemented");
  }
}

module.exports = { ArticleRepositoryInterface, ArticleServicesInterface };
