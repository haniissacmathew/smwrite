import { useEffect } from "react";
import { useNavigate    } from 'react-router-dom';
import { Outlet } from 'react-router-dom'; // Import Outlet for child routes
function DefaultLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.electron) {
      window.electron.onEventFromMain((event, data) => {
        console.log(event, data, "event receied");
      });
      window.electron.onNavigate((event, data) => {
        console.log(event, data, "event receied");
        navigate(data);
      });
    }
  }, []);
  return (
    <Outlet/>
  );
}

export default DefaultLayout;
