import "./App.css";
import UserList from "./components/UserList";

function App() {
    return (
        <>
            <div>
                <h4>
                    the backend is hosted on a free instance of Render.com, so
                    the instance goes to sleep on inactivity, pls wait for a min
                    or two and try refreshing to see it working
                </h4>
                <h1>leaderboard:</h1>
                <UserList></UserList>
            </div>
        </>
    );
}

export default App;
