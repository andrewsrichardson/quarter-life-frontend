export default function CommentsList({ comments }) {
  const commentsList = comments.map((comment, index) => {
    const date = comment.created_at.slice(0, 10);
    return (
      <div key={index} className="border-2 mt-5 flex justify-between">
        <div className="flex flex-col">
          <h3>{comment.content}</h3>
          <h3 className="text-xs">{comment.user.username}</h3>
        </div>
        <h3 className="justify-items-end">{date}</h3>
      </div>
    );
  });

  return commentsList;
}
