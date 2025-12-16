import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS_BY_PROJECT, GET_PROJECTS } from "../graphql/queries";
import { UPDATE_TASK_STATUS } from "../graphql/mutations";
import TaskComments from "./TaskComments";

interface Props {
  projectId: string;
  organizationSlug: string;
}

export default function TaskList({
  projectId,
  organizationSlug,
}: Props) {
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);

  const { data, loading, error } = useQuery(GET_TASKS_BY_PROJECT, {
    variables: { projectId, organizationSlug },
  });

  const [updateStatus] = useMutation(UPDATE_TASK_STATUS);

  if (loading) return <p className="text-sm text-gray-400">Loading tasks...</p>;
  if (error) return <p className="text-sm text-red-500">Failed to load tasks</p>;

  return (
    <div className="mt-3 space-y-2">
      {data.tasksByProject.map((task: any) => (
        <div
          key={task.id}
          className="border border-gray-700 rounded p-2"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{task.title}</p>
              <span className="text-xs text-gray-400">
                {task.status}
              </span>
            </div>

            {task.status !== "DONE" && (
              <button
  onClick={() =>
    updateStatus({
      variables: {
        organizationSlug: organizationSlug,
        taskId: task.id,
        status: "DONE",
      },
    })
  }
  className="text-xs bg-green-600 text-white px-2 py-1 rounded"
>
  Mark Done
</button>

            )}
          </div>

          <button
            onClick={() =>
              setOpenTaskId(openTaskId === task.id ? null : task.id)
            }
            className="text-xs text-blue-400 mt-1"
          >
            {openTaskId === task.id ? "Hide comments" : "View comments"}
          </button>

          {openTaskId === task.id && (
            <TaskComments
              taskId={task.id}
              organizationSlug={organizationSlug}
            />
          )}
        </div>
      ))}
    </div>
  );
}


