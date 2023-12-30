import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;
//
const ProtectedRoute = ({ children }) => {
  //  1. Load the Authenticated User
  const { error, isLoading, user, isAuthenticated } = useUser();
  const navigate = useNavigate(); // We Can't Call This navigate Function in the top level
  //    (We Use it in a Call Back or useEffect or in an EventListner)

  // 3. If there is no Authenticated User  , then redirect to the Login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate(`/login`);
  }, [isAuthenticated, isLoading, navigate]);
  //   2. While Loading Show Spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //  4. If there is a User  , render The App
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
