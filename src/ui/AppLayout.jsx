import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  background-color: red;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;
const AppLayout = () => {
  return (
    <>
      <StyledAppLayout>
        <Header />
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </StyledAppLayout>
    </>
  );
};

export default AppLayout;
