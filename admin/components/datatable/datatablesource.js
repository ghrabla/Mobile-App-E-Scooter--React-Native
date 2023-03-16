export const scooters = [
  { field: "_id", headerName: "ID", width: 100 },
  {
    field: "company",
    headerName: "Company",
    width: 100,
  },
  {
    field: "model",
    headerName: "Model",
    width: 200,
  },
  {
    field: "latitude",
    headerName: "Latitude",
    width: 150,
  },
  {
    field: "longitude",
    headerName: "Longitude",
    width: 200,
  },
  {
    field: "battery",
    headerName: "Battery",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="font-semibold text-base">
          {params.row.price} <span className="font-semibold">USD</span>
        </div>
      );
    },
  },
  {
    field: "isRented",
    headerName: "Rent Status",
    width: 100,
    renderCell: (params) => {
      return (
        <div
          className={
            params.row.isRented == "Rented"
              ? "bg-green-200 p-2 rounded-lg"
              : params.row.isRented == "Not Rented"
              ? "bg-yellow-200 p-2 rounded-lg"
              : "bg-red-400 p-2 rounded-lg"
          }
        >
          {params.row.isRented}
        </div>
      );
    },
  },
  {
    field: "isDisabled",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return (
        <div
          className={
            params.row.isDisabled == true
              ? "bg-red-400 p-2 rounded-lg ml-6"
              : "bg-green-400 p-2 rounded-lg ml-6"
          }
        >
          {params.row.isDisabled}
        </div>
      );
    },
  },
];


export const orders = [
  { field: "_id", headerName: "ID", width: 100 },
  {
    field: "user",
    headerName: "Customer",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="text-base">
          {params.row.user.name}
        </div>
      );
    },
  },
  {
    field: "company",
    headerName: "Company",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="text-base">
          {params.row.scooter.company}
        </div>
      );
    },
  },
  {
    field: "model",
    headerName: "Model",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="text-base">
          {params.row.scooter.model}
        </div>
      );
    },
  },
  {
    field: "rentedAt",
    headerName: "Rented At",
    width: 150,
  },
  {
    field: "returnedAt",
    headerName: "Returned At",
    width: 150,
  },
  {
    field: "timeOfRent",
    headerName: "Rent Time",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="text-base">
          {params.row.timeOfRent} <span className="font-semibold">Minutes</span>
        </div>
      );
    },
  },
];