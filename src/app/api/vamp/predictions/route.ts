import { PostPredictionPayload } from "@/app/api/clients/postPrediction";
import { encodeFileToBase64 } from "@/app/api/util/encodeFileToBase64";
import { handleApiError } from "@/app/api/util/handleApiError";
import {
  MUSIC_GEN_MODEL_VERSION,
  replicateClient,
} from "@/app/api/vamp/replicateClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = (await request.formData()) as FormData;
    const prompt = formData.get("prompt") as string;
    const duration = Number(formData.get("duration"));
    const inputAudio = formData.get("inputAudio") as string;
    const response = await replicateClient.predictions.create({
      version: MUSIC_GEN_MODEL_VERSION,
      input: {
        // model_version: "large",
        model_version: "melody",
        prompt,
        input_audio: inputAudio,
        // duration,
        continuation: false,
      },
    });
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    handleApiError(error);
  }
}
