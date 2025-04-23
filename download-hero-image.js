const fs = require("fs");
const https = require("https");
const path = require("path");

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, "public", "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// New hero image URL - a beautiful restaurant table setting with dramatic lighting
const heroImageUrl =
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600";
const filename = "hero-bg-new.jpg";
const filePath = path.join(imagesDir, filename);

console.log(`Downloading new hero image...`);

const file = fs.createWriteStream(filePath);
https
  .get(heroImageUrl, (response) => {
    response.pipe(file);
    file.on("finish", () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  })
  .on("error", (err) => {
    fs.unlink(filePath, () => {}); // Delete the file if there's an error
    console.error(`Error downloading ${filename}: ${err.message}`);
  });

console.log("Hero image download script started. This may take a moment...");
