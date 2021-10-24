import * as React from "react";
import "./404/styles.css";

export default function NotFoundPage({ location: { href } }) {
  return (
    <main>
      <title>Not found</title>
      <p>
        A problem has been detected and this website has been shut down to
        prevent damage to the internet.
      </p>
      <p>The problem seems to be caused by the following URL:</p>
      <br />
      <p>{href}</p>
      <br />
      <p>404_USER_INITIATED_A_WEIRD_WEB_REQUEST</p>
      <br />
      <p>
        I refuse to believe that my site might be broken. Why not go back to the
        <a href="/" style={{ marginLeft: 15 }}>
          home page
        </a>{" "}
        and start again.
      </p>
    </main>
  );
}
