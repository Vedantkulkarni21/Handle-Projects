// import { useQuery, useMutation } from "@apollo/client";
// import { GET_TASKS_BY_PROJECT } from "../graphql/queries";
// import { UPDATE_TASK_STATUS } from "../graphql/mutations";

// interface Props {
//   projectId: string;
//   organizationSlug: string;

// }

// export default function TaskList({ projectId }: Props) {
//   const { data, loading, error } = useQuery(GET_TASKS_BY_PROJECT, {
//     variables: { projectId },
//   });

//   const [updateStatus] = useMutation(UPDATE_TASK_STATUS);

//   if (loading) return <p className="text-sm text-gray-400">Loading tasks...</p>;
//   if (error) return <p className="text-red-500">Failed to load tasks</p>;

//   return (
//     <div className="mt-3 space-y-2">
//       {data.tasksByProject.map((task: any) => (
//         <div
//           key={task.id}
//           className="flex justify-between items-center border rounded p-2"
//         >
//           <div>
//             <p className="font-medium">{task.title}</p>
//             <span className="text-xs text-gray-500">{task.status}</span>
//           </div>

//           {task.status !== "DONE" && (
//             <button
//               onClick={() =>
//                 updateStatus({
//                   variables: {
//                     taskId: task.id,
//                     status: "DONE",
//                   },
//                 })
//               }
//               className="text-xs bg-green-600 text-white px-2 py-1 rounded"
//             >
//               Mark Done
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }



import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS_BY_PROJECT } from "../graphql/queries";
import { UPDATE_TASK_STATUS } from "../graphql/mutations";

interface Props {
  projectId: string;
  organizationSlug: string;
}

export default function TaskList({ projectId, organizationSlug }: Props) {
  const { data, loading, error } = useQuery(GET_TASKS_BY_PROJECT, {
    variables: {
      projectId,
      organizationSlug,
    },
  });

  const [updateStatus] = useMutation(UPDATE_TASK_STATUS);

  if (loading) return <p className="text-sm text-gray-400">Loading tasks...</p>;
  if (error) return <p className="text-red-500">Failed to load tasks</p>;

  return (
    <div className="mt-3 space-y-2">
      {data.tasksByProject.map((task: any) => (
        <div
          key={task.id}
          className="flex justify-between items-center border rounded p-2"
        >
          <div>
            <p className="font-medium">{task.title}</p>
            <span className="text-xs text-gray-500">{task.status}</span>
          </div>

          {task.status !== "DONE" && (
            <button
              onClick={() =>
                updateStatus({
                  variables: {
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
      ))}
    </div>
  );
}
