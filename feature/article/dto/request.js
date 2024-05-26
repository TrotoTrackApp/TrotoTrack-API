function articleRequest(body) {
  const { title, description, image } = body;
  return { title, description, image };
}


module.exports = { articleRequest };