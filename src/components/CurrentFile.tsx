"use client";

import { postPrediction } from "@/app/api/clients/postPrediction";
import { encodeFileToBase64 } from "@/app/api/util/encodeFileToBase64";
import { TAGS, Tag } from "@/app/constants/tags";
import { appState } from "@/state/appState";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState, KeyboardEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "zustand";

export function CurrentFile() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const { inputFile, tags, setTags } = useStore(appState);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  const inputFileUrl = useMemo(
    () => (inputFile ? URL.createObjectURL(inputFile) : null),
    [inputFile],
  );

  const addToSelection = (tag: Tag | string) => {
    setTags([...tags, tag]);
    setInput("");
  };

  const submit = async () => {
    try {
      if (!inputFile) return;
      const duration = audioRef.current!.duration;
      const audioFileDataUri = await encodeFileToBase64(inputFile);
      let prompt = "Enhance this audio sample for use in music production.";
      if (tags.length > 0) {
        prompt += ` Take influence from the following tags: ${tags.join(" ")}.`;
      }
      return await postPrediction({
        inputAudio: audioFileDataUri,
        prompt,
        duration,
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
      console.error(error);
    }
  };

  useEffect(
    () => () => {
      if (inputFileUrl) {
        URL.revokeObjectURL(inputFileUrl);
      }
    },
    [inputFileUrl],
  );

  if (!inputFileUrl || !inputFile) return null;

  return (
    <Box>
      <Box sx={{ display: "flex", borderBottom: "1px solid white", gap: 1 }}>
        <Autocomplete
          sx={{ display: "block", flexGrow: 1 }}
          multiple
          id="tags-filled"
          value={tags}
          options={TAGS}
          freeSolo
          inputValue={input}
          autoHighlight
          isOptionEqualToValue={(option, value) => option === value}
          renderOption={(props, option) => (
            <MenuItem
              {...props}
              key={option}
              onClick={() => addToSelection(option)}
            >
              <Typography>{option}</Typography>
            </MenuItem>
          )}
          componentsProps={{
            clearIndicator: {
              onClick: () => setTags([]),
            },
          }}
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              event.preventDefault();
              addToSelection(input);
            }
          }}
          renderTags={(value: readonly string[], getTagProps) => {
            return value.map((option, index) => {
              const { key, ...rest } = getTagProps({ index });
              return (
                <Chip variant="outlined" label={option} key={key} {...rest} />
              );
            });
          }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                variant="filled"
                label="Add tags to influence the output"
                //   label="What should your transformed sample sound like?"
                sx={{
                  "& input": {
                    height: "32px",
                  },
                  "& label": {
                    "&:not(.MuiInputLabel-shrink)": {
                      transform: "translate(12px, 17px) scale(1)",
                    },
                  },
                  "& .MuiInputBase-root": {
                    "&::before,::after": {
                      borderBottom: "unset",
                    },
                  },
                }}
                onChange={(event) => setInput(event.target.value)}
              />
            );
          }}
        />
        <Button disabled={isSubmitting} onClick={handleSubmit(submit)}>
          Vamp it
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          "& .MuiBox-root": {
            p: 2,
            flexBasis: "50%",
            "&:last-child": {
              borderLeft: "1px solid white",
            },
          },
        }}
      >
        <Box>
          <Typography>Seed</Typography>
          <audio ref={audioRef} src={inputFileUrl} controls></audio>
        </Box>
        <Box>
          <Typography>Vamped</Typography>
        </Box>
      </Box>
    </Box>
  );
}
