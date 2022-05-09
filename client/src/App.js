import './App.css';
import {BrowserRouter,Route,Switch}from "react-router-dom"
import Home from './components/Home';
import Landing from './components/Landing';
import Details from './components/Details';
import Create from './components/Create';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/Home' component={Home}/>
        <Route exact path='/Home/:id' component={Details}/>
        <Route exact path='/recipe' component={Create}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
