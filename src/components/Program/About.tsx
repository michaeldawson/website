import React from "react";
import TextProgram, { P } from "./Templates/Text";

export default function AboutProgram({ handleClose }: any) {
  return (
    <TextProgram title="About me.txt" handleClose={handleClose}>
      <P>
        Hi! I'm a software developer, currently lead engineer at{" "}
        <a target="_blank" href="http://airrobe.com">
          AirRobe.
        </a>
      </P>

      <P>
        I'm also working on a project to help people overcome addictions and
        unhelpful thought patterns, called{" "}
        <a target="_blank" href="https://impulse.training">
          Impulse.
        </a>
      </P>

      <P>
        I work with web, mobile and hardware technologies. My specialties /
        current focus areas are:
        <ul>
          <li>React Native</li>
          <li>Typescript / Javascript</li>
          <li>React / Gatsby / Next.js</li>
          <li>Web components / Lit</li>
          <li>Ruby / Rails</li>
          <li>SQL / Databases</li>
          <li>Serverless / Firebase</li>
          <li>Elasticsearch</li>
          <li>BLE (Bluetooth Low Energy) devices</li>
        </ul>
      </P>

      <P>
        I'm also interested in the startup process, in particular, how to reduce
        the cost and time that it takes to learn on the way to building
        something great. I recommend{" "}
        <a href="https://leanstack.com/" target="_blank">
          Lean Stack
        </a>{" "}
        for those interested in the science of successful startups.
      </P>

      <P>
        I'm a member of the Collaborative VC{" "}
        <a href="https://hitchhiker.vc">Hitchhiker</a> - we invest in amazing
        teams and game-changing ventures. I'm always interested in hearing about
        interesting projects that people are up to. Feel free to{" "}
        <a target="_blank" href="mailto:hi@michaeldawson.com.au">
          drop me a line!
        </a>
      </P>
    </TextProgram>
  );
}
