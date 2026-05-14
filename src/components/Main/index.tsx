import { ClippyProvider } from "@react95/clippy";
import { GlobalStyle, List, TaskBar, ThemeProvider } from "@react95/core";
import { Freecell1 as FreecellIcon } from "@react95/icons/esm/react/Freecell1";
import { RecycleFull } from "@react95/icons/esm/react/RecycleFull";
import { WebOpen } from "@react95/icons/esm/react/WebOpen";
import "@react95/icons/icons.css";
import { map, sortBy } from "lodash";
import React, { createElement, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useClippyHelper } from "../../hooks/useClippyHelper";
import { useWindowManager } from "../../hooks/useWindowManager";
import useWindowSize from "../../utils/useWindowSize";
import { desktopIconRegistry, DesktopIconName } from "../Icons/registry";
import IconWrapper from "../IconWrapper";
import * as Programs from "../Program";
import "./Main.scss";

function navigateTo(slug: string) {
  return () => {
    window.location.href = slug;
  };
}

function Main({
  data: {
    allMdx: { edges },
    mdx,
  },
  children,
}) {
  const size = useWindowSize();
  const { clippy } = useClippyHelper();
  const { openPrograms, openProgram, closeProgram, setSlug } = useWindowManager();

  const posts = edges.filter((edge) => !!edge.node.frontmatter.date);
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
            const iconName = post.node.frontmatter.desktopIcon as DesktopIconName;
            const Icon = desktopIconRegistry[iconName];

            return (
              <Icon
                key={index}
                handleDoubleClick={navigateTo(
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
                onClick={navigateTo(
                  node.frontmatter.link || node.frontmatter.slug
                )}
                className="startbar-item"
              >
                {node.frontmatter.startBarTitle || node.frontmatter.title}
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
