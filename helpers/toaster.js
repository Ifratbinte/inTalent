import { toast } from "react-toastify";

const mutationToaster = (promise) =>
  toast.promise(promise, {
    pending: "Submitting...",
    success: { render: renderSuccessMessage },
    error: { render: renderErrorMessage },
  });

const renderSuccessMessage = ({ data: { data = {} } = {} }) => {
  return data?.message ?? "Completed successfully";
};

const renderErrorMessage = ({ data = {} }) => {
  const responseMessage = data?.response?.data?.msg;
  const responseData = data?.response?.data?.data;

  if (responseData && responseData.length > 0) {
    return responseData.join("\n");
  }

  return responseMessage ?? "Something went wrong";
};

export default mutationToaster;
