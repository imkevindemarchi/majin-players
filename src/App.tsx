import { FC } from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import { StyleGuide } from "./pages";

const App: FC = () => {
    return (
        <Routes>
            <Route path="/style-guide" element={<StyleGuide />} />
        </Routes>
    );
};

export default App;
