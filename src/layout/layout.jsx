import { memo, Fragment } from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import { Tariff } from "../components/tariff/tariff";
import { Registration } from "../components/registration/registration";
import { Algorithm } from "../components/algorithm/algorithm";
import { useGetProfileQuery } from "../context/services/user.service";

export const Layout = memo(() => {
  const { data: profile } = useGetProfileQuery("2.6");
  console.log(profile);

  return (
    <Fragment>
      <main className="layout">
        <Header />
        <section>
          <Outlet />
        </section>
      </main>
      <Tariff />
      <Registration />
      <Algorithm />
    </Fragment>
  );
});
