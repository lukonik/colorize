import QuestionMark from '@mui/icons-material/QuestionMark';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';

export type COLORIZE_TYPES = 'artistic' | 'stable';

export default function ColorizerType({
  colorizeType,
  changeColorizeType,
}: {
  colorizeType: COLORIZE_TYPES;
  changeColorizeType: (type: COLORIZE_TYPES) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Stack direction="row" alignItems="center">
      <ToggleButtonGroup
        value={colorizeType}
        exclusive
        onChange={(_, newValue) => changeColorizeType(newValue)}
        color="primary"
      >
        <ToggleButton value="artistic">Artistic</ToggleButton>
        <ToggleButton value="stable">Stable</ToggleButton>
      </ToggleButtonGroup>
      <Box>
        <IconButton size="small" onClick={() => setIsOpen(true)}>
          <QuestionMark sx={{ fontSize: '18px' }} />
        </IconButton>
      </Box>

      <Dialog
        onClose={() => setIsOpen(false)}
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>Colorizer Type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1">
              "artistic" and "stable" refer to two different colorization models
              or modes that are optimized for different outcomes
            </Typography>
            <Typography
              sx={{ marginTop: '20px', marginBottom: '10px' }}
              variant="h5"
            >
              Artistic
            </Typography>
            <Typography variant="body1">
              <p>
                The "artistic" model is designed to produce more vibrant and
                stylized colors. It often emphasizes artistic expression over
                realism, which can result in more visually striking images. This
                mode may sometimes introduce colors that are not necessarily
                accurate to the original scene but are aesthetically pleasing.
              </p>
              <p>
                It's generally used when you want to create a more visually
                appealing or dramatic image, with a focus on enhancing the
                artistic quality rather than maintaining strict realism.
              </p>
            </Typography>
            <Typography
              sx={{ marginTop: '20px', marginBottom: '10px' }}
              variant="h5"
            >
              Stable
            </Typography>
            <Typography variant="body1">
              <p>
                The "stable" model, on the other hand, is optimized for realism
                and consistency. It aims to produce colors that are more natural
                and closer to what might be expected if the image were taken in
                color originally. This mode prioritizes reducing color artifacts
                and inconsistencies, making it a better choice for tasks where
                accuracy and realism are more important.
              </p>
              <p>
                It's suitable for colorizing images where a more conservative
                and natural look is desired.
              </p>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} type="submit">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
