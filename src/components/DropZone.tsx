"use client";

import { appState } from "@/state/appState";
import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Upload } from "react-feather";
import { useStore } from "zustand";

export function DropZone() {
  const { setInputFile, inputFile } = useStore(appState);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".aiff", ".flac"], // TODO: I don't know if this is the right limitation
    },
    onDropAccepted: (files) => {
      console.log(files);
      return setInputFile(files[0]);
    },
  });

  if (inputFile) return;

  return (
    <Box
      {...getRootProps()}
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        width: "100%",
        height: "400px",
        border: "2px dashed",
        borderColor: "grey.700",
      }}
    >
      <input {...getInputProps()}></input>
      <Typography>Upload a sample to get started</Typography>
      <Upload />
    </Box>
  );
}
