import React from "react";
import ReactPlayer from "react-player";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import PlayerControls from "./components/PlayerControls";


const useStyles = makeStyles({
  playerWrapper: {
    width: "100%",
    position: "relative",
    marginBottom: 30,
  },
})

function App() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed">
        <ToolBar>
          <Typography variant="h6">CATCHPLAY</Typography>
        </ToolBar>
      </AppBar>
      <ToolBar />
      <Container maxWidth="md" style={{padding: 30}}>
        <div className={classes.playerWrapper}>
          <ReactPlayer
            width="100%"
            height="100%"
            url="https://firebasestorage.googleapis.com/v0/b/catchplay-vedioplayer.appspot.com/o/video.mp4?alt=media&token=1aff1610-eee6-40d1-bf33-b0ed292ad30c"
            muted={false}
            playing={true} 
          />
          <PlayerControls />
        </div>
        </Container>
    </>
  );
}

export default App;
