import Header from "@/components/Header";
import { config } from "@/getToken";
import axios from "axios";
import React from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";

const customers = () => {
  const [users, setUsers] = React.useState();

  React.useEffect(() => {
    return async () => {
      try {
        const res = await axios.get("/api/admin/allUsers", config);
        setUsers(res.data);
        console.log(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header page="Customers"/>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Name</span>
            <span className="sm:text-left text-right">Email</span>
            <span className="hidden md:grid">Last Order</span>
            <span className="hidden sm:grid">Method</span>
          </div>
          <ul>
            {users?.map((user, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <BsPersonFill className="text-purple-800" />
                  </div>
                  <p className="pl-4">{user.name}</p>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  {user.email}
                </p>
                {/* <p className="hidden md:flex">{user.date}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <p>{user.method}</p>
                  <BsThreeDotsVertical />
                </div> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default customers;
