import styled from '@emotion/styled';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export function UploadFile({ uploaded }: { uploaded: (file: File) => void }) {
  const onDrop = useCallback(async (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file) {
      uploaded(file);
    }
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { 'image/*': [] }, onDrop: onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleInputFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = event.target.files; // Get the first file from the input
      if (files.length) {
        uploaded(files[0]);
      }
    }
  };

  return (
    <>
      <Button
        size="small"
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Browse
        <VisuallyHiddenInput
          accept="image/*"
          onChange={handleInputFileChange}
          type="file"
        />
      </Button>
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
          width: '300px',
        }}
      >
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Or Drag 'n' drop image here</p>
        </div>
      </Box>
    </>
  );
}
