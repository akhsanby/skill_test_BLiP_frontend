import { NextResponse } from "next/server";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);

export async function POST(req: any, res: any) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const type = formData.get("type");
    const filePath = `./public/images/${type}/${file.name}`;
    await pump(file.stream(), fs.createWriteStream(filePath));
    return NextResponse.json({ status: "success", path: `/images/${type}/${file.name}`, type });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
