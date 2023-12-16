import FormUser from "./components/FormUser/FormUser";

function App() {
  return (
    <div className="App">
      <h1 className="bg-slate-300 text-2xl font-bold text-center py-3 mb-5">
        Manage Student
      </h1>
      <div className="container mx-auto">
        <FormUser />
      </div>
    </div>
  );
}

export default App;
