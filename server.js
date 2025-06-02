import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import valuationSummaryHandler from "./api/valuation-summary.js"; // adjust path as needed

dotenv.config();

const app = express();
app.use(cors()); // allow CORS for frontend calls

// Define API route, mapping to your existing handler function
app.get("/api/valuation-summary", valuationSummaryHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
