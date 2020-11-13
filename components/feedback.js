import styles from "./feedback.module.css";
import Cookie from "js-cookie";
import { useState } from "react";
import { Button, Textarea } from "@chakra-ui/core";
import { createFeedback } from "@/lib/api";

export default function Feedback() {
  const [userText, setUserText] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  let feedBackOpen = isOpen ? styles.feedbackOpen : "";

  function onChange(event) {
    setUserText(event.target.value);
  }

  if (Cookie.get("feedback")) {
    return null;
  } else {
    return (
      <div className={styles.feedback}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          variantColor="yellow"
          className={styles.feedbackButton}
        >
          Feedback
        </Button>
        <div className={`${styles.feedbackContent} ${feedBackOpen}`}>
          {isCompleted ? (
            <div className="flex flex-col justify-evenly min-h-full">
              <h3 className="text-4xl text-center">😄</h3>
              <p className="text-2xl text-center">Thank you!</p>
            </div>
          ) : (
            <>
              <h3 className="mb-2">
                Please give us feedback! Your advice will help us to improve the
                site and help more people.
              </h3>
              <p className="text-sm">
                Feedback can be anything from finding a bug, to requesting new
                things.
              </p>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              <Textarea
                className="mt-5"
                focusBorderColor="yellow"
                onChange={(event) => onChange(event)}
              />
              <Button
                className="mt-1 m-auto"
                size="sm"
                variantColor="yellow"
                onClick={() => {
                  if (userText == null) {
                    setError("Please provide feedback");
                  } else {
                    createFeedback(userText)
                      .then(() => {
                        setIsCompleted(true);
                      })
                      .catch((error) => {
                        setError(error.response.data);
                      });
                  }
                }}
              >
                Send Feedback
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
}
