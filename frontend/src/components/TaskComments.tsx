import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASK_COMMENTS } from "../graphql/queries";
import { ADD_COMMENT } from "../graphql/mutations";

interface Props {
  taskId: string;
  organizationSlug: string;
}

export default function TaskComments({
  taskId,
  organizationSlug,
}: Props) {
  const [content, setContent] = useState("");

  const { data, loading } = useQuery(GET_TASK_COMMENTS, {
    variables: { taskId, organizationSlug },
  });

  const [addComment] = useMutation(ADD_COMMENT, {
  optimisticResponse: {
    addTaskComment: {
      __typename: "AddTaskComment",
      comment: {
        __typename: "TaskCommentType",
        id: "temp-id",
        content,
        authorEmail: "you@example.com",
        createdAt: new Date().toISOString(),
      },
    },
  },

  update(cache, { data }) {
    if (!data?.addTaskComment?.comment) return;

    const existing: any = cache.readQuery({
      query: GET_TASK_COMMENTS,
      variables: { taskId, organizationSlug },
    });

    cache.writeQuery({
      query: GET_TASK_COMMENTS,
      variables: { taskId, organizationSlug },
      data: {
        taskComments: [
          data.addTaskComment.comment,
          ...(existing?.taskComments || []),
        ],
      },
    });
  },
});



  if (loading)
    return <p className="text-xs text-gray-400">Loading comments...</p>;

  return (
    <div className="mt-3 border-t border-gray-700 pt-2">
      <div className="space-y-2">
        {data?.taskComments.map((comment: any) => (
          <div
            key={comment.id}
            className="text-sm bg-gray-900 p-2 rounded"
          >
            <p>{comment.content}</p>
            <span className="text-xs text-gray-500">
              {comment.authorEmail}
            </span>
          </div>
        ))}
      </div>

      <form
        className="mt-2 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!content.trim()) return;

          addComment({
            variables: {
              organizationSlug,
              taskId,
              content,
            },
          });

          setContent("");
        }}
      >
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 bg-gray-800 text-sm px-2 py-1 rounded"
          placeholder="Add a comment..."
        />
        <button className="text-xs bg-blue-600 px-3 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
