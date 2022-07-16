import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PageLayout } from "components/common";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("findYourSeat", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
