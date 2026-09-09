import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve .env path relative to server.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Helper to sanitize environment variables (remove leading/trailing quotes, semicolons, and spaces)
const cleanEnvVar = (val) => {
  if (!val) return "";
  return val.trim().replace(/^["']|["']$/g, "").replace(/;$/, "").trim();
};

const app = express();
const port = cleanEnvVar(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

const NORTH_CHECKOUT_BASE = "https://checkout.north.com";

app.post('/api/session', async (req, res) => {
  const privateKey = process.env.PRIVATE_API_KEY;
  const checkoutId = process.env.CHECKOUT_ID;
  const profileId = process.env.PROFILE_ID;

  console.log("Using credentials:", privateKey ? "Loaded" : "Missing", checkoutId ? "Loaded" : "Missing", profileId ? "Loaded" : "Missing");
  if (!privateKey || !checkoutId || !profileId) {
    return res.status(500).json({ error: "Missing North API credentials in .env" });
  }

  const { amount = 0, products = [] } = req.body;

  const northBody = JSON.stringify({ checkoutId, profileId, amount, products });
  const sessionUrl = `${NORTH_CHECKOUT_BASE}/api/sessions`;
  console.log('Session URL:', sessionUrl);

  try {
    const northRes = await fetch(sessionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${privateKey}`,
      },
      body: northBody,
    });

    const text = await northRes.text();
    res.setHeader('Content-Type', 'application/json');
    if (!northRes.ok) {
      console.log(northRes);
      return res.status(northRes.status).send(text);
    }
    return res.status(200).send(text);
  } catch (err) {
    console.error("[api/session] Error:", err.message);
    return res.status(502).json({ error: "Network error calling North" });
  }
});

app.post('/api/complete', async (req, res) => {
  const privateKey = cleanEnvVar(process.env.PRIVATE_API_KEY);
  const checkoutId = cleanEnvVar(process.env.CHECKOUT_ID);
  const profileId = cleanEnvVar(process.env.PROFILE_ID);

  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Missing session token" });
  }

  try {
    const statusUrl = `${NORTH_CHECKOUT_BASE}/api/sessions/status`;
    const northRes = await fetch(statusUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${privateKey}`,
        SessionToken: token,
        CheckoutId: checkoutId,
        ProfileId: profileId,
        "Accept-Language": "en",
        "User-Agent": "Embedded Checkout React Sample",
      },
    });

    const text = await northRes.text();
    if (!northRes.ok) {
      return res.status(northRes.status).json({ ok: false, raw: text });
    }
    return res.status(200).json({ ok: true, body: JSON.parse(text) });
  } catch (err) {
    console.error("[api/complete] Error:", err.message);
    return res.status(502).json({ error: "Network error calling North" });
  }
});

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
