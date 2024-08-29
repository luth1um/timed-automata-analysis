import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useButtonUtils } from '../utils/buttonUtils';
import { findUnreachableLocations } from 'timed-automata-analyzer';
import { useAnalyzerMappingUtils } from '../utils/analyzerMappingUtils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnalysisState, AnalysisViewModel } from '../viewmodel/AnalysisViewModel';

interface AnalysisDialogProps {
  open: boolean;
  viewModel: AnalysisViewModel;
  handleClose: () => void;
}

export const AnalysisDialog: React.FC<AnalysisDialogProps> = (props) => {
  const { open, viewModel, handleClose } = props;
  const { state, ta, setStateAnalyzing, setStateReady } = viewModel;
  const { t } = useTranslation();
  const { executeOnKeyboardClick } = useButtonUtils();
  const { mapTaToAnalyzerModel } = useAnalyzerMappingUtils();
  const [analysisResult, setAnalysisResult] = useState<JSX.Element | undefined>(undefined);

  const handleFormClose = () => {
    if (state !== AnalysisState.READY) {
      return;
    }
    handleClose();
    setAnalysisResult(undefined);
  };

  const handleAnalysis = () => {
    setStateAnalyzing(viewModel);
    let unreachableLocs: string[] = [];
    const mappedTa = mapTaToAnalyzerModel(ta);
    try {
      unreachableLocs = findUnreachableLocations(mappedTa);
      setStateReady(viewModel);
    } catch (error) {
      setStateReady(viewModel);
      setAnalysisResult(<p>{t('analysisDialog.analysis.error', { msg: error })}</p>);
      return;
    }

    if (unreachableLocs.length === 0) {
      setAnalysisResult(<p>{t('analysisDialog.analysis.resultAllReachable')}</p>);
    } else {
      const resultItems = unreachableLocs.map((loc, index) => <li key={'reach-result-' + index}>{loc}</li>);
      const unreachableText = t('analysisDialog.analysis.resultSomeUnreachable');
      setAnalysisResult(
        <>
          <p>{unreachableText}</p>
          <ul>{resultItems}</ul>
        </>
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleFormClose}
      PaperProps={{
        style: { minWidth: '450px' },
      }}
    >
      <DialogTitle>
        {t('analysisDialog.title')}
        <IconButton
          onMouseDown={handleFormClose}
          onKeyDown={(e) => executeOnKeyboardClick(e.key, handleFormClose)}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          disabled={state !== AnalysisState.READY}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <p>{t('analysisDialog.description')}</p>
        {analysisResult}
      </DialogContent>
      <DialogActions>
        <Button
          onMouseDown={handleFormClose}
          onKeyDown={(e) => executeOnKeyboardClick(e.key, handleFormClose)}
          variant="contained"
          color="error"
          disabled={state !== AnalysisState.READY}
        >
          {t('analysisDialog.button.close')}
        </Button>
        <Button
          onMouseDown={handleAnalysis}
          onKeyDown={(e) => executeOnKeyboardClick(e.key, handleAnalysis)}
          variant="contained"
          color="primary"
          disabled={state !== AnalysisState.READY}
        >
          {t('analysisDialog.button.analyze')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
