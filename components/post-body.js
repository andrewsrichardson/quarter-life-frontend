import markdownStyles from "./markdown-styles.module.css";
import DOMPurify from "dompurify";

export default function PostBody({ content }) {
  // const clean = DOMPurify.sanitize(content);

  return (
    <div className="max-w-2xl mx-auto p-2">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
