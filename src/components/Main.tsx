// import { ClippyProvider } from "@react95/clippy";
import { GlobalStyle, List, TaskBar, ThemeProvider } from "@react95/core";
import { Freecell1 as FreecellIcon } from "@react95/icons/esm/react/Freecell1";
import { RecycleFull } from "@react95/icons/esm/react/RecycleFull";
import { WebOpen } from "@react95/icons/esm/react/WebOpen";
import "@react95/icons/icons.css";
import { map } from "lodash";
import React, { createElement, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { v4 as uuidv4 } from "uuid";
import me from "../images/me.jpeg";
import useWindowSize from "../utils/useWindowSize";
// import clippy from "clippyjs";
// import "../clippy/clippy";
import IconWrapper from "./IconWrapper";
import "./main.css";
import * as Programs from "./Program";

const CLIPPY_WISDOM = [
  "It looks like you're trying to view my website. Would you like help with that?",
  "Hi there! Are you too young to remember clippy?",
  "Perhaps it is the file that exists, and you who do not?",
];

type ProgramName = keyof typeof Programs;

type OpenProgram = {
  pid: string;
  name: ProgramName;
  props?: any;
};

const history =
  typeof document === "undefined"
    ? null
    : require("history").createBrowserHistory();

export default function Main({
  data: {
    allMarkdownRemark: { edges },
    markdownRemark,
  },
}) {
  const size = useWindowSize();

  const [openPrograms, setOpenPrograms] = useState<Array<OpenProgram>>([]);

  function setSlug(slug: string) {
    history?.push("/" + slug);
  }

  const openProgram = (name: ProgramName, props = undefined) => {
    setSlug(props?.post?.frontmatter?.slug);

    setOpenPrograms([...openPrograms, { pid: uuidv4(), name, props }]);
  };

  const closeProgram = (processId: string) =>
    setOpenPrograms(openPrograms.filter(({ pid }) => processId !== pid));

  const Posts = edges.filter((edge) => !!edge.node.frontmatter.date); // You can filter your posts based on some criteria

  useEffect(() => {
    if (markdownRemark) openProgram("Post", { post: markdownRemark });
  }, [markdownRemark]);

  return (
    <ThemeProvider>
      <GlobalStyle></GlobalStyle>
      <Helmet title="Michael Dawson" defer={false} />

      <div style={{ height: "80vh" }}>
        <div style={{ display: "flex" }}>
          {size.width > 768 && (
            <IconWrapper
              white
              name="Freecell"
              handleDoubleClick={() => openProgram("Freecell")}
            >
              <FreecellIcon />
            </IconWrapper>
          )}
          {/* <IconWrapper
            white
            name="Impulse.txt"
            handleDoubleClick={() => openProgram("Impulse")}
          >
            <FileText />
          </IconWrapper> */}

          <div style={{ flexGrow: 1 }} />
          <a
            href="https://www.linkedin.com/in/michael-dawson-36453224/"
            target="_blank"
          >
            <IconWrapper white name="LinkedIn">
              <WebOpen />
            </IconWrapper>
          </a>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            height: "62%",
          }}
        >
          <IconWrapper
            handleDoubleClick={() => openProgram("Me")}
            name="me.jpeg"
            white
          >
            <img src={me} style={{ width: "32px", height: "32px" }} />
          </IconWrapper>
          <IconWrapper
            white
            name="Recycle Bin"
            handleDoubleClick={() => openProgram("RecycleBin")}
            style={{ marginTop: 40 }}
          >
            <RecycleFull />
          </IconWrapper>
        </div>
      </div>

      {map(openPrograms, ({ name, pid, props }, index) =>
        createElement(Programs[name] as any, {
          key: index,
          handleClose: () => closeProgram(pid),
          handleClick: () => setSlug(props?.post?.frontmatter?.slug),
          openProgram,
          ...props,
        })
      )}

      <TaskBar
        list={
          <List>
            {Posts.map(({ node }) => (
              <List.Item
                key={node.frontmatter.slug}
                icon={node.frontmatter.icon}
                onClick={() => {
                  openProgram("Post", { post: node });
                }}
              >
                {node.frontmatter.title}
              </List.Item>
            ))}
          </List>
        }
      />
    </ThemeProvider>
  );
}
