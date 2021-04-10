import { ClippyProvider, useClippy } from "@react95/clippy";
import { GlobalStyle, List, TaskBar, ThemeProvider } from "@react95/core";
import "@react95/icons/icons.css";
import { map, pick, values, without } from "lodash";
import * as React from "react";
import DesktopIcon from "../components/DesktopIcon";
import ExplorerProgram from "../components/ExplorerProgram";
import FreecellProgram from "../components/FreecellProgram";
import { default as TextProgram } from "../components/TextProgram";
import VirusProgram from "../components/VirusProgram";
import useWindowSize from "../utils/useWindowSize";

const CLIPPY_WISDOM = [
  "Hi! It looks like you're too young to remember clippy. Would you like some help getting off my lawn?",
  "Perhaps it is the file that exists, and you who do not?",
];

interface Program {
  type: React.ComponentType;
  title: string;
  children?: React.ReactNode;
}

const programs = {
  about: {
    type: TextProgram,
    title: "about.txt",
    children: () => (
      <>
        <p>
          Hi! I'm a software developer, currently lead engineer at{" "}
          <a target="_blank" href="http://airrobe.com">
            AirRobe.
          </a>
        </p>

        <p>
          I'm really passionate about web, mobile, and hardware technologies.{" "}
          <a href="#">Here's an overview</a> of a few technologies that I think
          are great to work with.
        </p>

        <p>
          I'm a member of the Collaborative VC{" "}
          <a href="https://hitchhiker.vc">Hitchhiker</a>, and am always
          interested in hearing about interesting projects that people are up
          to. Feel free to{" "}
          <a target="_blank" href="mailto:hi@michaeldawson.com.au">
            drop me a line!
          </a>
        </p>
      </>
    ),
  },
  explorer: {
    type: ExplorerProgram,
    title: "Windows Explorer",
    children: ({ openProgram }) => (
      <>
        <DesktopIcon
          handleClick={() => openProgram("airrobe")}
          iconName="file_pencil_32x32_4bit"
          name="airrobe.txt"
        />
        <DesktopIcon
          handleClick={() => openProgram("whatIveLearned")}
          iconName="file_pencil_32x32_4bit"
          name="whatIveLearned.txt"
        />
      </>
    ),
  },
  recycleBin: {
    type: ExplorerProgram,
    title: "Recycle Bin",
    children: ({ openProgram }) => (
      <DesktopIcon
        handleClick={() => openProgram("virus")}
        iconName="progman_19_32x32_1bit"
        name="virus.exe"
      />
    ),
  },
  freecell: {
    type: FreecellProgram,
    title: "Freecell",
  },
  airrobe: {
    type: TextProgram,
    title: "AirRobe",
    children: () => (
      <>
        <p>
          AirRobe is a sustainable fashion startup that is one to watch in{" "}
          {new Date().getFullYear()}. We're integrating with fashion retailers
          to provide a "virtual wardrobe". Purchases that you make can be added
          to your virtual wardrobe with just a few clicks, and re-sold or rented
          with a few clicks later.
        </p>
        <p>
          <a target="_blank" href="https://airrobe.com">
            Check it out
          </a>
        </p>
      </>
    ),
  },
  whatIveLearned: {
    type: TextProgram,
    title: "what-ive-learned.txt",
    children: () => (
      <>
        <p>
          Here are a few topics that I find interesting. Your Mileage May Vary!
        </p>
        <p>
          <a href="https://core.ac.uk/download/pdf/162652247.pdf">Fasting</a> is
          possibly one of the easiest ways to improve the length and quality of
          your.
        </p>
        <p>
          Sleeping on hard surfaces, for example, on the floor with a thin yoga
          mat, might help with back and neck problems.
        </p>
        <p>
          Body, neck, face and tongue posture might be{" "}
          <a
            href="https://www.youtube.com/watch?v=TY3bIMRKil8&ab_channel=21Studios"
            target="_blank"
          >
            more important than we once thought
          </a>
          . Also, try to chew tough, chewy foods!
        </p>
      </>
    ),
  },
  virus: {
    type: VirusProgram,
    title: "Virus",
  },
};

type ProgramName = keyof typeof programs;

function Homepage() {
  const { clippy } = useClippy();
  const size = useWindowSize();

  const [openProgramNames, setOpenProgramNames] = React.useState<
    Array<ProgramName>
  >(["about"]);

  const openProgram = (programName: ProgramName) =>
    setOpenProgramNames([...openProgramNames, programName]);

  const closeProgram = (programName: ProgramName) =>
    setOpenProgramNames(without(openProgramNames, programName));

  const openPrograms: Array<Program> = values(pick(programs, openProgramNames));

  React.useEffect(() => {
    if (clippy && typeof window !== "undefined") {
      clippy._el[0].addEventListener("click", clippy.animate);
    }
  }, [clippy]);

  return (
    <ThemeProvider>
      <GlobalStyle></GlobalStyle>

      <div style={{ height: "80vh" }}>
        <div style={{ display: "flex" }}>
          {size.width > 768 && (
            <DesktopIcon
              name="Freecell"
              iconName="freecell_1_32x32_4bit"
              handleClick={() => openProgram("freecell")}
              white
            />
          )}
          <DesktopIcon
            name="about.txt"
            iconName="file_pencil_32x32_4bit"
            handleClick={() => openProgram("about")}
            white
          />

          <div style={{ flexGrow: 1 }} />
          <a
            href="https://www.linkedin.com/in/michael-dawson-36453224/"
            target="_blank"
          >
            <DesktopIcon name="LinkedIn" iconName="web_open_16x16_4bit" white />
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
          <DesktopIcon
            name="Recycle Bin"
            iconName="recycle_full_32x32_4bit"
            handleClick={() => openProgram("recycleBin")}
            white
          />
        </div>
      </div>

      {map(openPrograms, (program, programName: ProgramName) => {
        const ProgramType = program.type;
        return (
          <ProgramType
            title={program.title}
            handleClose={() => {
              console.log(program);
              console.log(programName);
              closeProgram(programName);
              debugger;
            }}
          >
            {program.children ? program.children({ openProgram }) : null}
          </ProgramType>
        );
      })}

      <TaskBar
        list={
          <List>
            <List.Item
              icon="windows_explorer_32x32_4bit"
              onClick={() => {
                openProgram("explorer");
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
