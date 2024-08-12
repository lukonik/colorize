import { Box, CircularProgress, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

export default function ColorizedImage({
  isColorizing,
  colorizeImage,
}: {
  isColorizing: boolean;
  colorizeImage: string | null;
}) {
  if (isColorizing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              right: 0,
              top: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>

          <Skeleton
            variant="rectangular"
            sx={{
              maxHeight: '400px',
              minHeight: '300px',
              maxWidth: '400px',
              margin: '0 auto',
              borderRadius: '8px',
            }}
          />
        </Box>
      </motion.div>
    );
  }
  if (colorizeImage) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <img style={{ maxWidth: '100%' }} src={colorizeImage} />
      </Box>
    );
  }
  return null;
}
