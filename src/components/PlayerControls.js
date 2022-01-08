import React, {useState, forwardRef} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from '@material-ui/core/Popover';

// icon
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOff from "@material-ui/icons/VolumeOff";
import FullScreenIcon from "@material-ui/icons/Fullscreen";


function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const PrettoSlider = styled(Slider)({
  height: 3,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 16,
    width: 16,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const useStyles = makeStyles({
  playerWrapper: {
    width: "100%",
    position: "relative",
    marginBottom: 30,
  },
  controlWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 4,
    background: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1,
  },
  controlIcons: {
    color: "#777",
    fontSize: 50,
    transform: "scale(0.9)",
    transition: ".5s",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    }
  },
  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    }
  },
  volumeSlider: {
    width: 100,
  },
  vedioLength: {
    color: "#fff",
    marginLeft: 16
  }
})

export default forwardRef((
  {onPlayPause,
  playing,
  onRewind,
  onFastForward,
  muted,
  onMute,
  volume,
  onVolumeChange,
  onVolumeSeekUp,
  playbackRate,
  onPlaybackRateChange,
  onToggleFullScreen,
  played,
  onSeek,
  onSeekMouseDown,
  onSeekMouseUp,
  elapsedTime,
  totalDuration,
  onChangeDisplayFormat,
}, ref) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'playbackrate-popover' : undefined;
  
  return (
    <div className={classes.controlWrapper} ref={ref} style={{visibility: "visible"}}>

      {/* Top controls */}
      <Grid container direction="row" alignItems="center" justify="space-between" style={{ padding: 16 }}>
        <Grid item>
          <Typography variant="h6" style={{color:"#fff"}}>Javascript Tutorial</Typography>
        </Grid>
      </Grid>

      {/* middle controls */}
      <Grid container direction="row" alignItems="center" justify="center" style={{ padding: 16 }}>
        <IconButton
          onClick={onRewind}
          className={classes.controlIcons}
          aria-label="reqind"
        >
          <FastRewindIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={onPlayPause}
          className={classes.controlIcons}
          aria-label="reqind"
        >
          {playing ? <PauseIcon fontSize="inherit" /> : <PlayArrowIcon fontSize="inherit" />}
        </IconButton>
        <IconButton
          onClick={onFastForward}
          className={classes.controlIcons}
          aria-label="reqind"
        >
          <FastForwardIcon fontSize="inherit" />
        </IconButton>
      </Grid>

      {/* bottom controls */}
      <Grid container direction="row" alignItems="center" justify="space-between" style={{ padding: 16 }}>
        <Grid item xs={12}>
          <PrettoSlider
            min={0}
            max={100} 
            value={played * 100}
            ValueLabelComponent={(props) => (<ValueLabelComponent {...props} value={elapsedTime}/> )} 
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={onSeekMouseUp}
          />
        </Grid>
        <Grid item>
          <Grid container alignItems="center" direction="row">
            <IconButton onClick={onPlayPause} className={classes.bottomIcons}>
            {playing ? <PauseIcon fontSize="middle" /> : <PlayArrowIcon fontSize="middle" />}
            </IconButton>
            <IconButton onClick={onMute} className={classes.bottomIcons}>
              {muted ? <VolumeOff fontSize="middle" /> : <VolumeUpIcon fontSize="middle" />}
            </IconButton>
            <Slider
              min={0}
              max={100}
              value={volume * 100}
              className={classes.volumeSlider} 
              onChange={onVolumeChange}
              onChangeCommitted={onVolumeSeekUp}
            />
            <Button onClick={onChangeDisplayFormat} variant="text" className={classes.vedioLength}>
              <Typography>{elapsedTime} / {totalDuration}</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Button onClick={handlePopover} variant="text" className={classes.bottomIcons}>
            {playbackRate}X
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Grid container direction="column-reverse">
            {[0.5, 1, 1.5, 2].map(rate => (
              <Button onClick={() => onPlaybackRateChange(rate)} varient="text">
                <Typography color={rate === playbackRate ? "secondary" : "default"}>{rate}</Typography>
              </Button>))}
            </Grid>
          </Popover>
          <IconButton onClick={onToggleFullScreen} className={classes.bottomIcons}>
            <FullScreenIcon fontSize="middle"/>
          </IconButton>
        </Grid>
      </Grid>
    </div>
  )
})