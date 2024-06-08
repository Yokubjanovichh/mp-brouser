import { memo } from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Auth } from "./pages/auth/index";
import { Layout } from "./layout/layout";
import { Home } from "./pages/home/home";
const NotFound = () => <h1>404</h1>;

export const Router = memo(() => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Auth />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
});
