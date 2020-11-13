import Alert from "./alert";
import Feedback from "./feedback";
import Header from "./header";
import Meta from "./meta";

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Header></Header>
        <main>{children}</main>
        <Feedback />
      </div>
    </>
  );
}
