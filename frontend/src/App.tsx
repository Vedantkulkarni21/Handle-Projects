import ProjectList from "./components/ProjectList";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        Project Dashboard
      </h1>

      <ProjectList organizationSlug="acme" />
    </div>
  );
}

export default App;
