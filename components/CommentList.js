export default function CommentsList({ comments }) {
  const commentsList = comments.map((comment, index) => {
    const date = comment.created_at.slice(0, 10);
    return (
      <div key={index} className="border-2 mt-5 flex justify-between p-5">
        <div className="flex flex-col">
          <h3>{comment.content}</h3>
          <h3 className="text-xs">{comment.user.username}</h3>
        </div>
        <p className="text-xs justify-items-end">{date}</p>
      </div>
    );
  });

  return commentsList;
}
