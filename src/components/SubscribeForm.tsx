import { Alert, Button, Fieldset, Input } from "@react95/core";
import React, { useState } from "react";

export default function SubscribeForm() {
  const isSubscribed = localStorage.getItem("isSubscribed") === "true";
  const [value, setValue] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmitButtonClick = () => {
    setAlertVisible(true);
  };

  return (
    <div>
      {isAlertVisible ? (
        <Alert
          message="You are now subscribed!"
          closeAlert={() => {
            setAlertVisible(false);
          }}
          title="Cool"
        ></Alert>
      ) : null}

      {isSubscribed ? null : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: 20,
            paddingBottom: 20,
            minWidth: 300,
            maxWidth: 500,
            marginBottom: 20,
          }}
        >
          <Fieldset>
            <p>{isAlertVisible ? "ya" : "nein"}</p>
            <p>Get notified about new new posts</p>
            <Input
              style={{ width: "100%", marginBottom: 10 }}
              placeholder={"e.g. gigglybear4u@hotmail.com"}
              value={value}
              onChange={handleInputChange}
            ></Input>
            <Button onClick={handleSubmitButtonClick}>Subscribe</Button>
          </Fieldset>
        </div>
      )}
    </div>
  );
}
