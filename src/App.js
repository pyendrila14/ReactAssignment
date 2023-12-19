
import './App.css';
import Main from './components/Main/main-component';
import Navbar from './components/Navbar/navbar-component';
import './../src/style.css';

function App() {
  return (
    <div className="App">

    <Navbar/>
    <div style={{ marginTop: "40px" }}>
    <Main/>
    </div>



</div>
  );
}

export default App;
