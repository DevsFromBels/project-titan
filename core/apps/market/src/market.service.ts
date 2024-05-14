import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { extname, join } from "path";
import { uuidv7 } from "uuidv7";
import { Express } from "express";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];

@Injectable()
export class MarketService {
  getHello(): string {
    return "Hello World!";
  }

  createProduct(
    image: string,
    price_per_show: number,
    name: string,
    userID: string
  ) {
    // Здесь вы можете реализовать логику создания продукта
  }

  async handleUpload(fileUrl: string, userID: string, name: string) {
    console.log('FileUrl:', fileUrl, 'UserID:', userID, 'Name:', name);
    // Здесь вы можете добавить дополнительную логику для обработки загруженного файла
    return { message: 'File uploaded successfully' };
  }
}
