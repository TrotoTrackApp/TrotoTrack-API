const ScanServiceInterface = require("../entity/interface");
const tf = require("@tensorflow/tfjs-node");
const loadModel = require("../model/model");
const { ValidationError } = require("../../../utils/helper/response");

class ScanService extends ScanServiceInterface {
  constructor() {
    super();
  }

  async predict(image, model) {
    try {
      if (!image || !image.buffer) {
        throw new ValidationError("No image uploaded or invalid image buffer.");
      }

      const supportedTypes = [
        "image/bmp",
        "image/jpeg",
        "image/png",
        "image/gif",
      ];
      const mimeType = image.mimetype;

      if (!supportedTypes.includes(mimeType)) {
        throw new ValidationError(
          `Expected image (BMP, JPEG, PNG, or GIF), but got unsupported image type: ${mimeType}`
        );
      }

      const img = tf.node.decodeImage(image.buffer, 3);
      const resizedImg = tf.image.resizeNearestNeighbor(img, [299, 299]);
      const normalizedImg = resizedImg.toFloat().div(tf.scalar(255));
      const expandedImg = normalizedImg.expandDims(0);

      const classes = ["good", "heavy demaged", "light demaged"];
      const descriptions = {
        "good": "The item is in good condition.",
        "heavy demaged": "The item is heavily damaged.",
        "light demaged": "The item is lightly damaged.",
      };

      const predictions = await model.predict(expandedImg);
      const probabilities = predictions.dataSync();
      const percentages = probabilities.map((prob) => prob * 100);

      // Get the index of the highest probability
      const maxIndex = percentages.indexOf(Math.max(...percentages));
      const label = classes[maxIndex];
      const probability = percentages[maxIndex];
      const description = descriptions[label];

      console.log("Predicted label:", label);
      console.log("Prediction probabilities:", probabilities);
      console.log("Prediction percentages:", percentages);
      console.log("Description:", description);

      return { label, probability, description };
    } catch (error) {
      console.error("Prediction error:", error);
      throw error;
    }
  }
}

module.exports = ScanService;