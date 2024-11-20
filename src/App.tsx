import { FC } from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import { StyleGuide, LogIn } from "./pages";

const App: FC = () => {
    return (
        <Routes>
            <Route path="/style-guide" element={<StyleGuide />} />
            <Route path="/log-in" element={<LogIn />} />
        </Routes>
    );
};

export default App;
