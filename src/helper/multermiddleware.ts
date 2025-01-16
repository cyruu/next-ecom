// lib/multer.ts
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Save files to public/images
  },
  filename: function (req, file, cb) {
    const newFileName = uuidv4() + path.extname(file.originalname);
    cb(null, newFileName); // Save file with unique name
  },
});

export const upload = multer({ storage });

// Helper to handle multer uploads in Next.js route
export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
};