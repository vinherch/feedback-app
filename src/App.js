//Styles
import "./styles/app.scss";
//Components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStates from "./components/FeedbackStates";
import FeedbackForm from "./components/FeedbackForm";
import AboutLink from "./components/AboutLink";
import { FeedbackProvider } from "./context/FeedbackContext";
//Pages
import About from "./views/About";

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header></Header>
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStates />
                  <FeedbackList />
                </>
              }
            ></Route>
          </Routes>
          <Routes>
            <Route path={"/about/"} element={<About />} />
          </Routes>
          <AboutLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
