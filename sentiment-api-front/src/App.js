import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./App.css";

const App = () => {
  const [sentiment, setSentiment] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [loading, setLoading] = useState(false);

  const { REACT_APP_BACKEND_URL } = process.env;

  return (
    <Form.Group
      controlId="formBasicEmail"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
      }}
    >
      <Form.Label>Text Sentiment Analysis</Form.Label>
      <Form.Control
        as="textarea"
        rows="5"
        placeholder="Enter comment"
        onChange={(e) => setCommentValue(e.target.value)}
      />
      <Form.Text
        className="text-muted"
        style={{ fontWeight: "bold", fontSize: 16 }}
      >
        {sentiment === "" ? "" : sentiment}
      </Form.Text>
      <Button
        variant="primary"
        type="submit"
        onClick={() => {
          setLoading(true);
          axios
            .post(`${REACT_APP_BACKEND_URL}nlp/comment-analyzer`, {
              comment: commentValue,
            })
            .then((res) => {
              const { score } = res.data;
              let message =
                "Your message is OK according our posting policies.";

              if (parseFloat(score) < parseFloat(-0.5)) {
                message =
                  "Are you sure you want to post that message? Please be nice.";
              }

              setSentiment(message);
            })
            .catch((err) => console.log("err", err))
            .finally(() => setLoading(false));
        }}
        style={{ marginTop: 10 }}
        disabled={loading}
      >
        Submit
      </Button>
    </Form.Group>
  );
};

export default App;
