function articleResponse(article) {
  const response = {
    title: article.title,
    description: article.name,
    image: article.image,
    created_at: article.createdAt,
  };
  return response;
}

module.exports = { articleResponse };
