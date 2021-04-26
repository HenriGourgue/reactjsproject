import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';

import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

function App() {
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;
