function articleResponse(article) {
    const response = {
      title: article.title,
      description: article.name,
      image: article.image,
    };
    return response;
  }
  

  module.exports = { articleResponse };