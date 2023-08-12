import "server-only";

import Replicate from "replicate";

export const MUSIC_GEN_MODEL_VERSION =
  "7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906";

export const MUSIC_GEN_MODEL = `facebookresearch/musicgen:${MUSIC_GEN_MODEL_VERSION}`;

export const replicateClient = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});
