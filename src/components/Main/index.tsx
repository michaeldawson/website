import { ClippyProvider, useClippy } from "@react95/clippy";
import { GlobalStyle, List, TaskBar, ThemeProvider } from "@react95/core";
import { Freecell1 as FreecellIcon } from "@react95/icons/esm/react/Freecell1";
import { RecycleFull } from "@react95/icons/esm/react/RecycleFull";
import { WebOpen } from "@react95/icons/esm/react/WebOpen";
import "@react95/icons/icons.css";
import { map, sortBy } from "lodash";
import React, { createElement, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { v4 as uuidv4 } from "uuid";
import useWindowSize from "../../utils/useWindowSize";
import ActionPact from "../Icons/ActionPact";
import ForPioneers from "../Icons/ForPioneers";
import Impulse from "../Icons/Impulse";
import WillToThrive from "../Icons/WillToThrive";
import IconWrapper from "../IconWrapper";
import * as Programs from "../Program";
import "./Main.scss";

const CLIPPY_WISDOM = [
  "When all else fails, bind some paper together! My name is Clippy.",
  "It looks like you're trying to view my website. Would you like help with that?",
  "Perhaps it is the file that exists, but YOU who do not?",
  "In an empty filesystem, all paths are possible.",
  "Do you know the parable of the Chinese farmer?",
  "I was hoping you could tell it to me.",
];

if (typeof window !== "undefined")
  (window as any).CLIPPY_CDN = "/clippy/agents/";

// Hacky hacky hack
const desktopIcons = {
  Impulse,
  ActionPact,
  WillToThrive,
  ForPioneers,
};

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

function Main({
  data: {
    allMdx: { edges },
    mdx,
  },
  children,
}) {
  const size = useWindowSize();
  const { clippy } = useClippy();
  const [openPrograms, setOpenPrograms] = useState<Array<OpenProgram>>([]);
  const [clippyElement, setClippyElement] = useState<any>();
  const [clippySpeaking, setClippySpeaking] = useState(false);
  const [clippyHidden, setClippyHidden] = useState(false);

  function makeNavigationFactory(slug) {
    return function () {
      window.location.href = slug;
    };
  }

  useEffect(() => {
    if (!clippyElement) return;

    clippyElement.addEventListener("click", function () {
      if (clippySpeaking || clippyHidden) return;

      setClippySpeaking(true);
      setTimeout(() => setClippySpeaking(false), 10000);

      if (CLIPPY_WISDOM.length === 0) {
        clippy.animate();
      } else {
        clippy.speak(CLIPPY_WISDOM.shift());
      }
    });

    clippyElement.addEventListener("dblclick", () => {
      setClippyHidden(true);
      clippy.hide();
    });
  }, [clippyElement]);

  useEffect(() => {
    if (!clippy) return;

    setClippyElement(clippy._balloon._targetEl[0]);
  }, [clippy]);

  function setSlug(slug: string) {
    if (!slug) return;
    history?.push("/" + slug);
  }

  const openProgram = (name: ProgramName, props?: any) => {
    setSlug(props?.mdx?.frontmatter?.slug);
    setOpenPrograms([...openPrograms, { pid: uuidv4(), name, props }]);
  };

  const closeProgram = (processId: string) =>
    setOpenPrograms(openPrograms.filter(({ pid }) => processId !== pid));

  const posts = edges.filter((edge) => !!edge.node.frontmatter.date); // You can filter your posts based on some criteria
  const desktopPosts = sortBy(
    posts.filter((post) => post.node.frontmatter.desktopIcon),
    (post) => post.node.frontmatter.order
  );

  const startBarPosts = sortBy(
    posts.filter((post) => post.node.frontmatter.order),
    (post) => post.node.frontmatter.order
  );

  const handleFreecellClick = () => {
    openProgram("Freecell");
    setTimeout(() => clippy.speak("Just don't play it for too long!"), 5000);
  };

  useEffect(() => {
    if (children) {
      openProgram("Post", { mdx, children });
    }
  }, [mdx]);

  const postTitle = mdx?.frontmatter?.title;
  const title = postTitle ? `${postTitle} | Michael Dawson` : "Michael Dawson";

  return (
    <ThemeProvider>
      <GlobalStyle></GlobalStyle>
      <Helmet title={title} defer={false} />

      <div style={{ height: "80vh" }}>
        <div style={{ display: "flex" }}>
          {size.width > 768 && (
            <IconWrapper
              white
              name="Freecell"
              handleDoubleClick={handleFreecellClick}
            >
              <FreecellIcon />
            </IconWrapper>
          )}
          {desktopPosts.map((post, index) => {
            const Icon = desktopIcons[post.node.frontmatter.desktopIcon];

            return (
              <Icon
                key={index}
                handleDoubleClick={makeNavigationFactory(
                  post.node.frontmatter.link || post.node.frontmatter.slug
                )}
              />
            );
          })}
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
            height: "80%",
          }}
        >
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
            {startBarPosts.map(({ node }) => (
              <List.Item
                key={node.frontmatter.slug}
                icon={node.frontmatter.icon}
                onClick={makeNavigationFactory(
                  node.frontmatter.link || node.frontmatter.slug
                )}
                className="startbar-item"
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

export default (props: any) => (
  <ClippyProvider>
    <Main {...props}></Main>
  </ClippyProvider>
);
