import express from 'express';
import axios from 'axios';
import FormData from 'form-data';

const router = express.Router();

// Feature toggle flag (can also be from env variable)
let IMAGE_GEN_ENABLED = false;

// Middleware to check toggle
function checkImageGenEnabled(req, res, next) {
  if (!IMAGE_GEN_ENABLED) {
    return res.status(403).json({ message: "Image generation is currently disabled." });
  }
  next();
}

// Main generate image route with toggle check middleware
router.route('/')
  .post(checkImageGenEnabled, async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
      }

      const form = new FormData();
      form.append('prompt', prompt);
      form.append('output_format', 'png');
      form.append('aspect_ratio', '1:1');

      const response = await axios.post(
        'https://api.stability.ai/v2beta/stable-image/generate/core',
        form,
        {
          headers: {
            Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
            ...form.getHeaders(),
          },
        }
      );

      const image = response.data.image;

      if (!image) {
        return res.status(500).json({ message: "No image returned" });
      }

      res.status(200).json({ photo: image });

    } catch (error) {
      console.error("❌ Stability API error:", error?.response?.data || error.message);
      res.status(500).json({
        message: "Image generation failed",
        errorMsg: error?.response?.data || error.message,
      });
    }
  });

// Admin toggle endpoint (insecure - add auth in production)
router.route('/toggle').post((req, res) => {
  const { enable } = req.body;
  if (typeof enable !== 'boolean') {
    return res.status(400).json({ message: "Invalid enable flag; must be boolean" });
  }
  IMAGE_GEN_ENABLED = enable;
  res.status(200).json({ message: `Image generation ${enable ? 'enabled' : 'disabled'}` });
});

export default router;
