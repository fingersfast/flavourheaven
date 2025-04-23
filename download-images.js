const fs = require("fs");
const https = require("https");
const path = require("path");

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, "public", "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Unsplash image URLs
const images = {
  // Hero image
  "hero-bg.jpg":
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",

  // Dish images
  "dish1.jpg":
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
  "dish2.jpg":
    "https://images.unsplash.com/photo-1599321955726-e48d2be61998?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
  "dish3.jpg":
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
  "caesar-salad.jpg":
    "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
  "beef-wellington.jpg":
    "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
  "lobster-bisque.jpg":
    "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
  "grilled-salmon.jpg":
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
  "tiramisu.jpg":
    "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",
  "seared-scallops.jpg":
    "https://images.unsplash.com/photo-1560717845-968823efbee1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600",

  // Restaurant images
  "restaurant-interior.jpg":
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
  "restaurant-table.jpg":
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",

  // Testimonial images
  "testimonial1.jpg":
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200",
  "testimonial2.jpg":
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200",
  "testimonial3.jpg":
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200",

  // Map placeholder
  "map-placeholder.jpg":
    "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
};

// Download images
Object.entries(images).forEach(([filename, url]) => {
  const filePath = path.join(imagesDir, filename);

  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`${filename} already exists, skipping...`);
    return;
  }

  console.log(`Downloading ${filename}...`);

  const file = fs.createWriteStream(filePath);
  https
    .get(url, (response) => {
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
});

console.log("Image download script started. This may take a moment...");
