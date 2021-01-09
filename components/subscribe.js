import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Input, Button } from "@chakra-ui/core";

const url =
  "https://20sos.us7.list-manage.com/subscribe/post?u=0c9d341cd18db743c1a337894&amp;id=aed1e46dd5";

// simplest form (only email)
const Myform = ({ status, message, onValidated }) => {
  let email, name;
  const submit = () =>
    email &&
    name &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      NAME: name.value,
    });

  return (
    <div className="flex flex-col">
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <Input
        style={{ fontSize: "1em", padding: 5, margin: 5 }}
        ref={(node) => (name = node)}
        type="text"
        placeholder="Your name"
      />
      <Input
        style={{ fontSize: "1em", padding: 5, margin: 5 }}
        ref={(node) => (email = node)}
        type="email"
        placeholder="Your email"
      />
      <Button
        style={{ alignSelf: "center" }}
        size="sm"
        bg="brand.800"
        color="white"
        onClick={submit}
      >
        Submit
      </Button>
    </div>
  );
};

// use the render prop and your custom form
const CustomForm = () => (
  <div className="flex justify-center align-center min-h-full">
    <div className="m-auto">
      <h2 className="text-2xl">Subscribe to our newsletter</h2>
      <p className="text-xs italic">Updates on new posts at 20SOS.</p>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <div>
            {status !== "success" && (
              <Myform
                onValidated={(formData) => subscribe(formData)}
                onSubmitted={(formData) => subscribe(formData)}
              />
            )}

            {status === "sending" && (
              <div style={{ color: "blue" }}>sending...</div>
            )}
            {status === "error" && (
              <div
                style={{ color: "red" }}
                dangerouslySetInnerHTML={{ __html: message }}
              />
            )}
            {status === "success" && (
              <div style={{ color: "green" }}>Subscribed !</div>
            )}
          </div>
        )}
      />
    </div>
  </div>
);

export default CustomForm;
