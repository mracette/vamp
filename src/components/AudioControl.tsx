"use client";

import { Chip } from "@mui/material";
import { useRef } from "react";

interface Props {
  src: string | null;
}

export function AudioControl({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Does not differentiate between "expired" and "in progress"
  return src ? (
    <audio ref={audioRef} preload="metadata" controls src={src} />
  ) : (
    <Chip label="Expired" variant="filled" color="warning" />
  );
}
