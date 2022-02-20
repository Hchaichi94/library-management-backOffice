import {
  Routes,
  Route,
} from "react-router-dom";

import LoginLayoutRoute from "./utils/LoginRoute";
import Login from "./pages/Login";

import NotFound from "./pages/NotFound";
import LogoutLayoutRoute from "./utils/LogoutRoute";
import ListUsers from "./pages/users";
import CreateUser from "./pages/createUser";
import ListCategories from "./pages/categories";
import CreateCategory from "./pages/createCategory";
import ListAuthers from "./pages/authers";
import CreateAuther from "./pages/createAuther";
import SignUp from "./pages/SignUp";
import ListBooks from "./pages/books";
import CreateBook from "./pages/createBook";


function App() {
  return (
    <div className="App">

      <Routes>

        <Route element={<LoginLayoutRoute />}>
          <Route path="/" element={<ListUsers />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/categories" element={<ListCategories />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/authers" element={<ListAuthers />} />
          <Route path="/create-auther" element={<CreateAuther />} />
          <Route path="/books" element={<ListBooks />} />
          <Route path="/create-book" element={<CreateBook />} />
        </Route>

        <Route element={<LogoutLayoutRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;