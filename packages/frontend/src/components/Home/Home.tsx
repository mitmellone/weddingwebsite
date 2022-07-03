import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PageLayout } from "components/common";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("findYourSeat", { replace: true });
  }, [navigate]);

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
