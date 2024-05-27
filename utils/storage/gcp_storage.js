const { Storage } = require("@google-cloud/storage");
const path = require("path");

// Dekode string base64
const base64EncodedKey = process.env.GOOGLE_CLOUD_KEY_BASE64;
const serviceKey = Buffer.from(base64EncodedKey, "base64").toString("utf8");

// Parse JSON key
const serviceKeyJson = JSON.parse(serviceKey);

// Buat klien Google Cloud Storage
const storage = new Storage({
  credentials: serviceKeyJson,
  projectId: serviceKeyJson.project_id,
});

// Referensi bucket Anda
const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName);

// Fungsi untuk mengunggah file ke GCS
const uploadFileToGCS = async (filePath) => {
  const fileName = path.basename(filePath);
  const folderName = process.env.FOLDER_NAME;
  const destination = `${folderName}/${fileName}`;

  try {
    let typeFile;
    const ext = path.extname(fileName).toLowerCase();
    if (ext === ".jpeg" || ext === ".jpg") {
      typeFile = "image/jpeg";
    } else if (ext === ".png") {
      typeFile = "image/png";
    } else {
      throw new Error("File bukan file gambar (jpeg/png)");
    }

    await bucket.upload(filePath, {
      destination: destination,
      resumable: false,
      public: true,
      metadata: {
        contentType: typeFile,
      },
    });

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${folderName}/${fileName}`;
    return publicUrl;
  } catch (err) {
    console.error("Error saat mengunggah file:", err);
    throw err;
  }
};

module.exports = { uploadFileToGCS };
