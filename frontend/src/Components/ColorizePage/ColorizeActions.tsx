import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { motion } from 'framer-motion';

export default function ColorizeActions({
  downloadImage,
  regenerate,
}: {
  downloadImage: () => Promise<void>;
  regenerate: () => Promise<void>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Stack direction="row" justifyContent="end" spacing={1}>
        <LoadingButton
          size="small"
          onClick={downloadImage}
          color="secondary"
          variant="outlined"
        >
          Save
        </LoadingButton>
        <Button
          size="small"
          variant="outlined"
          color="success"
          onClick={regenerate}
        >
          Renew
        </Button>
      </Stack>
    </motion.div>
  );
}
