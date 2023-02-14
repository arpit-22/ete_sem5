// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
import Profilescreen from './screens/Profilescreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Switch>
      <Route exact path="/home" component={Homescreen}/>
      <Route exact path="/book/:providerid" component={Bookingscreen}/>
      <Route exact path="/register" component={Registerscreen}/>
      <Route exact path="/login" component={Loginscreen}/>
      <Route exact path="/profile" component={Profilescreen}/>
      <Route exact path="/admin" component={Adminscreen}/>
      <Route exact path="/" component={Landingscreen}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
