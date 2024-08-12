import { QuestionMark } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import Slider from '@mui/material/Slider';
import { Stack } from '@mui/system';
import { useState } from 'react';

export default function RenderFactor({
  renderFactor,
  changeRenderFactor,
}: {
  renderFactor: number;
  changeRenderFactor: (value: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        width: {
          xs: '100%',
          md: '400px',
        },
      }}
    >
      <Typography
        style={{ textAlign: 'left', width: '100%', marginTop: '20px' }}
      >
        Render Factor
      </Typography>
      <Stack direction="row" alignItems="center">
        <Slider
          sx={{
            width: '100%',
          }}
          defaultValue={35}
          min={1}
          max={40}
          value={renderFactor}
          onChange={(_, newValue) => changeRenderFactor(newValue as number)}
          valueLabelDisplay="auto"
          aria-label="Disabled slider"
        />
        <Box>
          <IconButton
            size="small"
            sx={{ marginLeft: '10px' }}
            onClick={() => setIsOpen(true)}
          >
            <QuestionMark sx={{ fontSize: '18px' }} />
          </IconButton>
        </Box>
      </Stack>

      <Dialog
        onClose={() => setIsOpen(false)}
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>Render Factor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1">
              <p>
                Render Factor is a parameter that controls the resolution and
                quality of the colorization process. It is essentially a
                trade-off between speed and quality.
              </p>
              <p>
                It ranges from 1 to 40, and you can adjust it depending on your
                specific needs. A common value is 35
              </p>
            </Typography>
            <Typography
              sx={{ marginTop: '20px', marginBottom: '10px' }}
              variant="h5"
            >
              Higher
            </Typography>
            <Typography variant="body1">
              This typically results in better colorization quality with more
              details and finer color gradients but takes more processing time.
            </Typography>
            <Typography
              sx={{ marginTop: '20px', marginBottom: '10px' }}
              variant="h5"
            >
              Lower
            </Typography>
            <Typography variant="body1">
              This speeds up the processing but might result in lower quality
              colorization with less detail and more color bleeding or
              artifacts.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} type="submit">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
