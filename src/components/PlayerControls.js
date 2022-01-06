import React, {useState} from "react";
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
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
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
  // color: '#52af77',
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
    background: "rgba(0, 0, 0, 0.6)",
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


export default function PlayerControls() {

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
    <div className={classes.controlWrapper}>

            {/* Top controls */}
            <Grid container direction="row" alignItems="center" justify="space-between" style={{ padding: 16 }}>
              <Grid item>
                <Typography variant="h6" style={{color:"#fff"}}>video title</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<BookmarkIcon />}
                >
                  Bookmark
                </Button>
              </Grid>
            </Grid>

            {/* middle controls */}
            <Grid container direction="row" alignItems="center" justify="center" style={{ padding: 16 }}>
              <IconButton
                className={classes.controlIcons}
                aria-label="reqind"
              >
                <FastRewindIcon fontSize="inherit"/>
              </IconButton>
              <IconButton
                className={classes.controlIcons}
                aria-label="reqind"
              >
                <PlayArrowIcon fontSize="inherit"/>
              </IconButton>
              <IconButton
                className={classes.controlIcons}
                aria-label="reqind"
              >
                <FastForwardIcon fontSize="inherit"/>
              </IconButton>
            </Grid>

            {/* bottom controls */}
            <Grid container direction="row" alignItems="center" justify="space-between" style={{ padding: 16 }}>
              <Grid item xs={12}>
                <PrettoSlider min={0} max={100} defaultValue={20} ValueLabelComponent={ValueLabelComponent}/>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" direction="row">
                  <IconButton className={classes.bottomIcons}>
                    <PlayArrowIcon fontSize="large" />
                  </IconButton>
                  <IconButton className={classes.bottomIcons}>
                    <VolumeUpIcon fontSize="large" />
                  </IconButton>
                  <Slider min={0} max={100} defaultValue={100} className={classes.volumeSlider} />
                  <Button variant="text" className={classes.vedioLength}>
                    <Typography>00:27</Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <Button onClick={handlePopover} variant="text" className={classes.bottomIcons}>1X</Button>
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
                    {[0.5, 1, 1.5, 2].map(rate => (<Button varient="text">
                      <Typography color="secondary">{rate}</Typography>
                    </Button>))}
                  </Grid>
                </Popover>
                <IconButton className={classes.bottomIcons}>
                  <FullScreenIcon fontSize="large"/>
                </IconButton>
              </Grid>
            </Grid>

            
          </div>
  )
}