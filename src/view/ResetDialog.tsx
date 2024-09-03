import { useTranslation } from 'react-i18next';
import { useButtonUtils } from '../utils/buttonUtils';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ResetDialogProps {
  open: boolean;
  handleClose: () => void;
  handleReset: () => void;
}

export const ResetDialog: React.FC<ResetDialogProps> = (props) => {
  const { open, handleClose, handleReset } = props;
  const { t } = useTranslation();
  const { executeOnKeyboardClick } = useButtonUtils();

  const confirmReset = () => {
    handleClose();
    handleReset();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {t('resetDialog.title')}
        <IconButton
          onMouseDown={handleClose}
          onKeyDown={(e) => executeOnKeyboardClick(e.key, handleClose)}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{t('resetDialog.contentText')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onMouseDown={handleClose}
          onKeyDown={(e) => executeOnKeyboardClick(e.key, handleClose)}
          variant="contained"
          color="primary"
        >
          {t('resetDialog.button.cancel')}
        </Button>
        <Button
          onMouseDown={confirmReset}
          onKeyDown={(e) => executeOnKeyboardClick(e.key, confirmReset)}
          variant="contained"
          color="error"
          data-testid="button-confirm-ta-reset"
        >
          {t('resetDialog.button.reset')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
