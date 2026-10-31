import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use("/api/v1/dalle", dalleRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E" });
});

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
