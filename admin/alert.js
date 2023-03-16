import { toast } from "react-toastify";
import swal from "sweetalert";

// error message
export const errorMessage = (error) => {
  toast.error(error, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// success message
export const successMessage = (success) => {
  toast.success(success, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// warning message
export const warningMessage = (warning) => {
  toast.warning(warning, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// info message
export const infoMessage = (info) => {
  toast.info(info, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// sweet alert with confirm button and cancel button
export const sweetAlert = ({
  title,
  acceptMessage,
  cancelMessage,
  theFunction,
}) => {
  swal({
    title: title,
    text: acceptMessage,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      theFunction();
    } else {
      swal(cancelMessage);
    }
  });
};
