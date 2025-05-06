import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config(); 

const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;

if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
  console.error("Missing ImageKit environment variables:");
  if (!IMAGEKIT_PUBLIC_KEY) console.error("→ IMAGEKIT_PUBLIC_KEY is missing");
  if (!IMAGEKIT_PRIVATE_KEY) console.error("→ IMAGEKIT_PRIVATE_KEY is missing");
  if (!IMAGEKIT_URL_ENDPOINT) console.error("→ IMAGEKIT_URL_ENDPOINT is missing");
  throw new Error("Missing ImageKit environment variables. Please check your .env file.");
}

const imagekit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;
