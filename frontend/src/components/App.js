import Nav from "./reused_elements/Nav";
import SideBar from "./reused_elements/Sidebar";

 
function App() {
  return (
    <div className="App">
      <div className="lg  h-full">
        <Nav />
        <div className="dark-bg lg flex gap-5 h-100">
          <SideBar />
          Hello
        </div>
      </div>
      
    </div>
  );
}

export default App;
