const tf = require("@tensorflow/tfjs-node");
require("dotenv").config();

function loadModel() {
  url = process.env.MODEL_URL;
  result = tf.loadGraphModel(url);
  return result;
}

module.exports = loadModel;
