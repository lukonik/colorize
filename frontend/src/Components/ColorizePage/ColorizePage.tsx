import { Box, Container, Divider, SxProps } from '@mui/material';
import saveAs from 'file-saver';
import { useState } from 'react';
import ColorizeActions from './ColorizeActions';
import ColorizedImage from './ColorizedImage';
import ColorizerType, { COLORIZE_TYPES } from './ColorizerType';
import RenderFactor from './RenderFactor';
import { UploadFile } from './UploadFile';

const mainContainer: SxProps = {
  padding: '20px',
};

const optionsContainer: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

async function sendImage(
  file: File,
  options: {
    renderFactor: number;
    type: string;
  }
) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('renderFactor', options.renderFactor.toString()); // Example renderFactor value
  formData.append('colorizerType', options.type); // Example colorizerType value
  const response = await fetch('http://127.0.0.1:8000/colorize', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const blob = await response.blob(); // Get the response as a blob
  const imageUrl = URL.createObjectURL(blob); // Create a URL for the blob
  return imageUrl;
}

export function ColorizePage() {
  const [renderFactor, setRenderFactor] = useState(35);
  const [colorizeType, setColorizeType] = useState<COLORIZE_TYPES>('artistic');
  const [colorizeImage, setColorizeImage] = useState<string | null>(null);
  const [isColorizing, setIsColorizing] = useState(false);
  const [colorizeFile, setColorizeFile] = useState<File | null>(null);

  async function uploadFile(file: File) {
    setColorizeFile(file);
    setIsColorizing(true);
    sendImage(file, {
      renderFactor,
      type: colorizeType,
    })
      .then((url) => {
        setColorizeImage(url);
      })
      .finally(() => {
        setIsColorizing(false);
      });
  }

  async function regenerate() {
    if (colorizeFile) {
      uploadFile(colorizeFile);
    }
  }

  async function downloadImage() {
    await fetch(colorizeImage as string)
      .then((r) => r.blob())
      .then((d) => {
        saveAs(d);
      });
  }

  return (
    <Container sx={{ paddingBottom: '30px' }}>
      <Box sx={mainContainer}>
        <Box sx={optionsContainer}>
          <ColorizerType
            colorizeType={colorizeType}
            changeColorizeType={(value) => setColorizeType(value)}
          />
          <RenderFactor
            renderFactor={renderFactor}
            changeRenderFactor={(factor) => setRenderFactor(factor)}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              sx: 'row',
              md: 'column',
            },
            alignItems: 'center',
            gap: '12px',
            marginY: '10px',
            justifyContent: {
              xs: 'space-between',
              md: 'center',
            },
          }}
        >
          <UploadFile uploaded={uploadFile} />
          {colorizeImage && (
            <ColorizeActions
              regenerate={regenerate}
              downloadImage={downloadImage}
            />
          )}
        </Box>

        <Divider sx={{ marginY: '20px' }}></Divider>

        <ColorizedImage
          colorizeImage={colorizeImage}
          isColorizing={isColorizing}
        />
      </Box>
    </Container>
  );
}
