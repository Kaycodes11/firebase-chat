import Sidebar from "../features/Sidebar";
import Chat from "../features/Chat";

const Home = () => {
    return (
        <div className='home'>
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}
export default Home;
