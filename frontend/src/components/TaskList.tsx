
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS_BY_PROJECT, GET_PROJECTS } from "../graphql/queries";
import { UPDATE_TASK_STATUS } from "../graphql/mutations";

interface Props {
  projectId: string;
  organizationSlug: string;
}

export default function TaskList({
  projectId,
  organizationSlug,
}: Props) {
  const { data, loading, error } = useQuery(
    GET_TASKS_BY_PROJECT,
    {
      variables: { projectId, organizationSlug },
    }
  );

  const [updateStatus] = useMutation(
    UPDATE_TASK_STATUS,
    {
      optimisticResponse: {
        updateTaskStatus: {
          __typename: "UpdateTaskStatus",
          task: {
            __typename: "TaskType",
            id: projectId,
            status: "DONE",
          },
        },
      },

      update(cache, { data }) {
        if (!data) return;

        /* -------- Update task list -------- */
        const taskData: any = cache.readQuery({
          query: GET_TASKS_BY_PROJECT,
          variables: { projectId, organizationSlug },
        });

        if (taskData) {
          cache.writeQuery({
            query: GET_TASKS_BY_PROJECT,
            variables: { projectId, organizationSlug },
            data: {
              tasksByProject: taskData.tasksByProject.map(
                (task: any) =>
                  task.id === data.updateTaskStatus.task.id
                    ? { ...task, status: "DONE" }
                    : task
              ),
            },
          });
        }

        /* -------- Update project counters -------- */
        const projectData: any = cache.readQuery({
          query: GET_PROJECTS,
          variables: { orgSlug: organizationSlug },
        });

        if (projectData) {
          cache.writeQuery({
            query: GET_PROJECTS,
            variables: { orgSlug: organizationSlug },
            data: {
              projectsByOrganization:
                projectData.projectsByOrganization.map(
                  (project: any) =>
                    project.id === projectId
                      ? {
                          ...project,
                          completedTasks:
                            project.completedTasks + 1,
                        }
                      : project
                ),
            },
          });
        }
      },
    }
  );

  if (loading)
    return <p className="text-sm text-gray-400 mt-2">Loading tasks...</p>;

  if (error)
    return <p className="text-sm text-red-500 mt-2">Failed to load tasks</p>;

  return (
    <div className="mt-3 space-y-2">
      {data.tasksByProject.map((task: any) => (
        <div
          key={task.id}
          className="flex justify-between items-center border border-gray-700 rounded p-2"
        >
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
                    organizationSlug,
                    taskId: task.id,
                    status: "DONE",
                  },
                })
              }
              className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
            >
              Mark Done
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
