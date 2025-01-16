import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (errmsg: String, statusCode: Number) =>
  toast(errmsg, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: statusCode == 200 ? "success" : "error",
    theme: "colored",
  });