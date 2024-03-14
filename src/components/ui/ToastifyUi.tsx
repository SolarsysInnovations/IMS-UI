import React from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CustomToastContainerProps extends ToastContainerProps {
    position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

}

const ToastUi: React.FC<CustomToastContainerProps> = ({
    position = "top-right",

}) => {
    return (
        <ToastContainer
            position={position}
        />
    );
};

export default ToastUi;
