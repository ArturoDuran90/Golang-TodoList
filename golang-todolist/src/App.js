import './App.css';
import HomePg from  './pages/Homepage';
import CreatePg from './pages/CreateTask';
import ViewPg from './pages/ViewTask';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
					<Route path='/' exact element={<HomePg/>} />
          <Route path='/create' exact element={<CreatePg/>} />
          <Route path='/view' exact element={<ViewPg/>} />
		    </Routes>
      </Router>
    </div>
  );
}

export default App;
