const tf = require('@tensorflow/tfjs-node');
require('dotenv').config();

async function loadModel() {
  const modelUrl = process.env.MODEL_URL;
  return tf.loadLayersModel(modelUrl);
}

module.exports = loadModel;
