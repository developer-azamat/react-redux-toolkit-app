import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { Register, Login, Main } from "./components"

function App() {
    const state = useSelector(state=> state.countReducer.count)
  return (
    <div>
        <Routes>
            <Route path={'/'} element={<Main />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/login'} element={<Login />} />

        </Routes>
    </div>
  );
}

export default App;
