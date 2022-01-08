import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import PlayerControls from "./components/PlayerControls";
import screenfull from "screenfull";



const useStyles = makeStyles({
  playerWrapper: {
    width: "100%",
    position: "relative",
    marginBottom: 30,
  },
})

const format = (seconds) => {
  if (isNaN(seconds)){
    return "00:00";
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = date.getUTCSeconds().toString().padStart(2, "0")
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`
  }
  return `${mm}:${ss}`
}

function App() {

  const classes = useStyles();
  let count = 0;
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [bookmarks, setBookmarks] = useState([]);
  const [state, setState] = useState({
    pip: false,
    playing: false,
    controls: false,
    light: false,

    muted: false,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    playing,
    muted,
    playbackRate,
    played,
    seeking,
    volume,
  } = state;


  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {
    if (count > 3) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
    if (controlsRef.current.style.visibility === "visible") {
      count += 1;
    }
    if (!seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    console.log({ value: e.target });
    setState({ ...state, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleVolumeChange = (e, newValue) => {
    // console.log(newValue);
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const handleMouseEnter = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const handleMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "remaining" : "normal"
    );
  };

  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  const elapsedTime =
    timeDisplayFormat === "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);


  return (
    <>
      <AppBar position="fixed">
        <ToolBar>
          <Typography variant="h6">CATCHPLAY</Typography>
        </ToolBar>
      </AppBar>
      <ToolBar />
      <Container maxWidth="md" style={{padding: 30}}>
        <div
          ref={playerContainerRef}
          className={classes.playerWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ReactPlayer
            ref={playerRef}
            width="100%"
            height="100%"
            url="https://firebasestorage.googleapis.com/v0/b/catchplay-vedioplayer.appspot.com/o/Getting%20Started%20With%20Javascript%20_%20Javascript%20Tutorial%20For%20Beginners.mp4?alt=media&token=42b019b1-496c-4beb-8697-dda2c22210c8"
            muted={muted}
            playing={playing}
            volume={volume}
            playbackRate={playbackRate}
            onProgress={handleProgress}          
          />
          <PlayerControls
            ref={controlsRef}
            onPlayPause={handlePlayPause}
            playing={playing}
            onRewind={handleRewind}
            onFastForward={handleFastForward}
            muted={muted}
            onMute={handleMute}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            onVolumeSeekUp={handleVolumeChange}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRate}
            onToggleFullScreen={toggleFullScreen}
            played={played}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            onChangeDisplayFormat={handleDisplayFormat}
          />
        </div>
      </Container>
    </>
  );
}

export default App;
