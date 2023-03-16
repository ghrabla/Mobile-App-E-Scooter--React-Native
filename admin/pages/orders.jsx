import React from "react";
import Header from "@/components/Header";
import { config } from "@/getToken";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Datatable from "@/components/datatable/Datatable";

const orders = () => {
  const [bookings, setBookings] = React.useState();

  React.useEffect(() => {
    return async () => {
      try {
        const res = await axios.get("/api/user/rented", config);
        setBookings(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header page="Orders" />
      <div className="p-4">
        {!bookings ? (
          <div className="flex justify-center items-center h-[70vh]">
            <Spinner />
          </div>
        ) : (
          <Datatable data={bookings} title="All Bookings" />
        )}
      </div>
    </div>
  );
};

export default orders;
