// import { useQuery } from "@apollo/client";
// import { GET_PROJECTS } from "../graphql/queries";

// interface ProjectListProps {
//   organizationSlug: string;
// }

// export default function ProjectList({ organizationSlug }: ProjectListProps) {
//   const { data, loading, error } = useQuery(GET_PROJECTS, {
//     variables: { orgSlug: organizationSlug },
//   });

//   if (loading) return <p className="text-gray-400">Loading projects...</p>;
//   if (error) return <p className="text-red-500">Error loading projects</p>;

//   return (
//     <div className="space-y-4">
//       {data.projectsByOrganization.map((project: any) => (
//         <div
//           key={project.id}
//           className="bg-gray-800 p-4 rounded-lg"
//         >
//           <h2 className="text-xl font-semibold">{project.name}</h2>
//           <p className="text-sm text-gray-400">{project.status}</p>
//           <p className="text-sm">
//             Tasks: {project.completedTasks} / {project.taskCount}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/queries";
import TaskList from "./TaskList";

interface Props {
  organizationSlug: string;
}

export default function ProjectList({ organizationSlug }: Props) {
  const { data, loading, error } = useQuery(GET_PROJECTS, {
    variables: { orgSlug: organizationSlug },
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error loading projects</p>;

  return (
    <div className="space-y-4">
      {data.projectsByOrganization.map((project: any) => (
        <div
          key={project.id}
          className="border rounded p-4 bg-gray-800"
        >
          <div
            className="cursor-pointer"
            onClick={() =>
              setSelectedProjectId(
                selectedProjectId === project.id ? null : project.id
              )
            }
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="text-sm text-gray-400">{project.status}</p>
            <p className="text-sm mt-1">
              Tasks: {project.completedTasks} / {project.taskCount}
            </p>
          </div>

          {selectedProjectId === project.id && (
            <TaskList
  projectId={project.id}
  organizationSlug={organizationSlug}
/>

          )}
        </div>
      ))}
    </div>
  );
}
