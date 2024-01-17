import Nav from "./reused_elements/Nav/Nav";
import SideBar from "./reused_elements/Sidebar/Sidebar";

 
function App() {
  return (
    <div className="App grid h-screen">
      <div className="lg h-full">
        <Nav />
        <div className="dark-bg lg flex gap-5 h-full">
          <SideBar />
          <div>
            Hello
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
