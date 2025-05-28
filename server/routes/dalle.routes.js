import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';
import FormData from 'form-data';

dotenv.config();

const router = express.Router();

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Construct form-data for multipart request
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

export default router;
