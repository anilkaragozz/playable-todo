import Auth from "@/pages/Auth";
import Todo from "@/pages/todo/ListTodo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todo/" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
