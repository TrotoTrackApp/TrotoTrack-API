function articleResponse(article) {
  const response = {
    title: article.title,
    description: article.name,
    image: article.image,
    created_at: article.createdAt,
  };
  return response;
}

function listArticleResponse(article) {
  const response = [];
  for (const data of article) {
    const articleResponse = articleResponse(data);
    response.push(articleResponse);
  }
  return response;
}

module.exports = { articleResponse, listArticleResponse };
