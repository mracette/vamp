export interface PostPredictionPayload {
  prompt: string;
  duration: number;
  inputAudio: string;
}

export async function postPrediction({
  inputAudio,
  prompt,
  duration,
}: PostPredictionPayload) {
  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("duration", String(duration));
  if (inputAudio) {
    formData.append("inputAudio", inputAudio);
  }

  // Do not set Content-Type header, it will be set automatically
  // set to reflect the multipart boundary.
  const headers = new Headers();
  headers.append("Accept", "application/json");

  const response = await fetch("/api/vamp/predictions", {
    method: "POST",
    headers: headers,
    body: formData,
  });
  return response.json();
}
