interface ToastConfigProps {
    position: any;
    autoClose: number;
    hideProgressBar: boolean;
    closeOnClick: boolean;
    pauseOnHover: boolean;
    draggable: boolean;
    progress?: undefined; // Make progress optional
    theme: string;
}

export const toastConfig: ToastConfigProps = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    // progress: undefined, // You can remove this line because it's already optional in the interface
    theme: "dark",
};

