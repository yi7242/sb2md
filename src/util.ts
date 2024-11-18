import { randomInt } from "crypto";
import * as download from "image-downloader";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export function escapePageName(pageName: string): string {
  return pageName.replaceAll("/", " ").replaceAll(":", " ");
}

let downloadList: { url: string; dest: string }[] = [];

export function enqueueGyazo(url: string) {
  const gyazoId = url.match(/https:\/\/gyazo.com\/([0-9a-f]+)/)![1];
  const originalUrl = `https://i.gyazo.com/${gyazoId}.png`;
  const filename = "gyazo-" + gyazoId + ".png";
  const filepath = path.join(process.cwd(), "output/assets/" + filename);
  downloadList.push({ url: originalUrl, dest: filepath });
  return filename;
}
export function enqueueImage(url: string) {
  const filename = url.split("/").pop();
  const filepath = path.join(process.cwd(), "output/assets/" + filename);
  console.log(`add to download list: ${url} -> ${filepath}`);
  downloadList.push({ url: url, dest: filepath });
  return filename;
}

async function downloadImage(url: string, dest: string) {
  // axiosを使用して画像をダウンロードする
  const response = await axios.get(url, {
    headers: { Cookie: process.env.COOKIE },
    responseType: "arraybuffer",
  });
  fs.writeFileSync(dest, Buffer.from(response.data), "binary");
}

export async function downloadImages() {
  // return;
  console.info(`Downloading images... (total: ${downloadList.length})`);
  let count = 0;
  for (const item of downloadList) {
    count++;
    try {
      if (fs.existsSync(item.dest)) {
        console.info(`Skip downloading ${item.url} to ${item.dest}`);
        continue;
      }
      await downloadImage(item.url, item.dest);
      console.log(
        `Downloaded ${item.url} to ${item.dest} (${count}/${downloadList.length})`
      );
      await new Promise((s) => setTimeout(s, 200 + randomInt(2500)));
    } catch (e) {
      console.error(e);
    }
  }
}
