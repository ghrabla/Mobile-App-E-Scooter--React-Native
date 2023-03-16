import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "@/getToken";
import { errorMessage, successMessage } from "../../alert";

const viewOrder = async (_id) => {
  localStorage.removeItem("userId");
  localStorage.removeItem("carId");
  localStorage.removeItem("orderId");
  localStorage.setItem("orderId", _id);
};

//@desc   Function that disable and enable scooter
const Scooter = async (_id) => {
  try {
    // axios with header
    const res = await axios.put(`/api/admin/scooter/${_id}`, config);
    // show sweet alert
    successMessage(res.data.message);
    // window.location.reload();
  } catch (error) {
    errorMessage(error.response.data.message);
  }
};


// car action table
export const scooterAction = [
  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <div
            className={
              params.row.isDisabled
                ? "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                : "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            }
            onClick={Scooter.bind(this, params.row._id)}
          >
            {params.row.isDisabled ? "Enable" : "Disable"}
          </div>
        </div>
      );
    },
  },
];

// order action table
export const orderAction = [
  {
    field: "action",
    headerName: "Action",
    width: 210,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to="/orders/single" style={{ textDecoration: "none" }}>
            <div
              className="viewButton"
              onClick={() => viewOrder(params.row._id)}
            >
              View
            </div>
          </Link>
        </div>
      );
    },
  },
];
