import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function GET() {
  return await replicate.run(
    "facebookresearch/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
    {
      input: {
        model_version: "large",
        prompt: "Wedding harp music",
      },
    },
  );
}
