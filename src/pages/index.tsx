import { ClippyProvider, useClippy } from "@react95/clippy";
import {
  Frame,
  GlobalStyle,
  Icon,
  List,
  Modal,
  TaskBar,
  ThemeProvider,
} from "@react95/core";
import "@react95/icons/icons.css";
import useInterval from "@use-it/interval";
import styled from "@xstyled/styled-components";
import * as React from "react";
import useWindowSize from "../utils/useWindowSize";
import harlemShake from "../viruses/harlemShake";

const CLIPPY_WISDOM = [
  "Hi! It looks like you're too young to remember clippy. Would you like some help getting off my lawn?",
  "Perhaps it is the file that exists, and you who do not?",
];

const IconContainer = styled.button`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4;
  width: 70px;
  height; 70px;
  border: none;
  background-color: transparent;

  i,
  :hover {
    cursor: pointer;
  }

  i {
    margin-bottom: 8;
  }
`;

function Homepage() {
  if (typeof window !== "undefined") {
    (window as any).CLIPPY_CDN = "./static/clippy/agents/";
  }

  const { clippy } = useClippy();

  const [first, toggleFirst] = React.useState(false);
  const [freecell, toggleFreecell] = React.useState(false);
  const [airrobe, toggleAirrobe] = React.useState(false);
  const [recycle, toggleRecycle] = React.useState(false);
  const [about, toggleAbout] = React.useState(true);
  const [bjj, toggleBjj] = React.useState(false);
  const [impulse, toggleImpulse] = React.useState(false);

  const size = useWindowSize();

  useInterval(() => {
    clippy.speak(CLIPPY_WISDOM[1]);
  }, 60 * 10000);

  const closeFirst = () => toggleFirst(false);
  const closeFreecell = () => toggleFreecell(false);

  function notAVirus() {
    setTimeout(() => clippy.play("LookUp"), 1000);
    setTimeout(() => clippy.speak("Oh no"), 2000);
    setTimeout(() => clippy.play("Idle"), 4000);

    setTimeout(() => clippy.speak("What did you do"), 6000);
    setTimeout(() => clippy.play("LookDownLeft"), 7000);
    setTimeout(() => clippy.speak("I'm not hanging around for this"), 10400);
    setTimeout(() => clippy.play("EmptyTrash"), 10500);
    setTimeout(() => clippy.hide(), 14400);
    setTimeout(() => clippy.show(), 35000);

    setTimeout(
      () =>
        clippy.speak("But did you think anything good was going to happen?"),
      50000
    );

    harlemShake();
  }

  React.useEffect(() => {
    if (!clippy) return;

    if (typeof window !== "undefined") {
      window.clippy = clippy;
      window.harlemShake = harlemShake;
      window.clippy._balloon._targetEl[0].addEventListener("click", () =>
        clippy.animate()
      );
    }
  }, [clippy]);

  const iconStyle = {
    style: {
      width: 40,
      height: 40,
      marginRight: 4,
    },
  };

  return (
    <ThemeProvider>
      <GlobalStyle></GlobalStyle>

      <div style={{ height: "80vh" }}>
        <div style={{ display: "flex" }}>
          {size.width > 768 && (
            <IconContainer style={{ color: "white" }}>
              <Icon
                name="freecell_1_32x32_4bit"
                className="draggable"
                onClick={() => toggleFreecell(true)}
                {...iconStyle}
              />
              Freecell
            </IconContainer>
          )}
          <IconContainer style={{ color: "white" }}>
            <Icon
              name="file_pencil_32x32_4bit"
              className="draggable"
              onClick={() => toggleAbout(true)}
              {...iconStyle}
            />
            about.txt
          </IconContainer>
          <div style={{ flexGrow: 1 }} />
          <a
            href="https://www.linkedin.com/in/michael-dawson-36453224/"
            target="_blank"
          >
            <IconContainer style={{ color: "white" }}>
              <Icon
                name="web_open_16x16_4bit"
                className="draggable"
                {...iconStyle}
              />
              LinkedIn
            </IconContainer>
          </a>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            height: "80%",
          }}
        >
          <IconContainer style={{ color: "white" }}>
            <Icon
              name="recycle_full_32x32_4bit"
              className="draggable"
              onClick={() => toggleRecycle(true)}
              {...iconStyle}
            />
            Recycle Bin
          </IconContainer>
        </div>
      </div>

      {first && (
        <Modal
          icon="windows_explorer_32x32_4bit"
          title="Windows Explorer"
          closeModal={closeFirst}
          width="300"
          height="200"
        >
          <Frame
            height="100%"
            boxShadow="in"
            bg="white"
            style={{ display: "flex" }}
          >
            <IconContainer>
              <Icon
                name="file_pencil_32x32_4bit"
                className="draggable"
                onClick={() => toggleAirrobe(true)}
                {...iconStyle}
              />
              AirRobe
            </IconContainer>

            <IconContainer>
              <Icon
                name="file_pencil_32x32_4bit"
                className="draggable"
                onClick={() => toggleBjj(true)}
                {...iconStyle}
              />
              BJJ.AI
            </IconContainer>

            <IconContainer>
              <Icon
                name="file_pencil_32x32_4bit"
                className="draggable"
                onClick={() => toggleImpulse(true)}
                {...iconStyle}
              />
              Impulse
            </IconContainer>
          </Frame>
        </Modal>
      )}

      {recycle && (
        <Modal
          icon="recycle_full_32x32_4bit"
          title="Recycle Bin"
          width={Math.min(500, size.width).toString()}
          height="300"
          closeModal={() => toggleRecycle(false)}
        >
          <Frame
            height="100%"
            boxShadow="in"
            bg="white"
            style={{ display: "flex" }}
          >
            <IconContainer onClick={notAVirus}>
              <Icon
                name="progman_19_32x32_1bit"
                className="draggable"
                {...iconStyle}
              />
              virus.exe
            </IconContainer>
          </Frame>
        </Modal>
      )}

      {freecell && (
        <Modal
          icon="freecell_1_32x32_4bit"
          title="Freecell"
          width={size.width}
          height={Math.min(
            (size.width / 4) * 3,
            (size.height / 7) * 6
          ).toString()}
          closeModal={closeFreecell}
          style={{
            padding: 0,
          }}
        >
          <iframe
            style={{ height: "100%", width: "100%" }}
            src="https://online-solitaire.com/freecell"
          ></iframe>
        </Modal>
      )}

      {about && (
        <Modal
          defaultPosition={{ x: 50, y: 50 }}
          width="300"
          height="200"
          icon="reader_closed_32x32_4bit"
          title="about.txt"
          closeModal={() => toggleAbout(false)}
        >
          <Frame
            height="100%"
            boxShadow="in"
            bg="white"
            style={{ paddingLeft: 4, paddingRight: 4 }}
          >
            <p>
              Hi! I'm a software developer, currently lead engineer at{" "}
              <a target="_blank" href="http://airrobe.com">
                AirRobe.
              </a>
            </p>

            <p>
              I'm am a member of the Collaborative VC{" "}
              <a href="https://hitchhiker.vc">Hitchhiker</a>, and am always
              interested in hearing about interesting projects that people are
              up to. Feel free to{" "}
              <a target="_blank" href="mailto:hi@michaeldawson.com.au">
                drop me a line!
              </a>
            </p>

            <p>
              I'm also working on a couple of side project apps,{" "}
              <a href="https://bjj.ai" target="_blank">
                BJJ.AI
              </a>{" "}
              and <a href="https://impulse.training">Impulse</a>.
            </p>
          </Frame>
        </Modal>
      )}

      {airrobe && (
        <Modal
          defaultPosition={{ x: 50, y: 50 }}
          width="300"
          height="200"
          icon="reader_closed_32x32_4bit"
          title="AirRobe.txt"
          closeModal={() => toggleAirrobe(false)}
        >
          <Frame height="100%" boxShadow="in" bg="white">
            <p>
              AirRobe is a sustainable fashion startup that is one to watch in{" "}
              {new Date().getFullYear()}. We're integrating with ethical fashion
              merchants to provide a "virtual wardrobe". Purchases that you make
              can be added to your virtual wardrobe with just a few clicks, and
              re-sold or rented with a few clicks later.
            </p>
            <p>
              <a href="https://airrobe.com">Check it out</a>
            </p>
          </Frame>
        </Modal>
      )}

      {bjj && (
        <Modal
          defaultPosition={{ x: 50, y: 50 }}
          width="300"
          height="200"
          icon="reader_closed_32x32_4bit"
          title="AirRobe.txt"
          closeModal={() => toggleAirrobe(false)}
        >
          <Frame height="100%" boxShadow="in" bg="white">
            <p>
              BJJ.AI is a work-in-progress app for Brazilian Jiu Jitsu students
              and clubs.
            </p>
            <p>
              <a href="https://bjj.ai">Check it out</a>
            </p>
          </Frame>
        </Modal>
      )}

      {impulse && (
        <Modal
          defaultPosition={{ x: 50, y: 50 }}
          width="300"
          height="200"
          icon="reader_closed_32x32_4bit"
          title="AirRobe.txt"
          closeModal={() => toggleAirrobe(false)}
        >
          <Frame height="100%" boxShadow="in" bg="white">
            <p>Impulse is a work-in-progress app to help with addictions.</p>
            <p>
              <a href="https://impulse.training">Check it out</a>
            </p>
          </Frame>
        </Modal>
      )}

      <TaskBar
        list={
          <List>
            <List.Item
              icon="windows_explorer_32x32_4bit"
              onClick={() => {
                toggleFirst(true);
              }}
            >
              Windows Explorer
            </List.Item>
          </List>
        }
      />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ClippyProvider>
      <Homepage />
    </ClippyProvider>
  );
}
