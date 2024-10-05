import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { authAdmin } from "@/services/auth";
import type { ValuesSesion } from "@/types/types";
import { ToastCammon } from "../ToastCammon";

interface FormInicioSesionProps {
    isAuthenticated: boolean;
}

const Auth: React.FC<FormInicioSesionProps> = ({ isAuthenticated }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>("");
    const [bgToast, setBgToast] = useState<string>("");

    if (isAuthenticated) {
        return window.location.href = "/";
    }

    const handleSubmit = async (values: ValuesSesion) => {
        setIsLoading(true)
        try {
            const response = await authAdmin(values)
            if (response && response.status === 200) {
                window.location.href = "/";
                localStorage.setItem('infoProfileUSer', JSON.stringify(response.data))
            } else {
                setBgToast('danger')
                setIsLoading(false)
                setShowToast(true)
                setToastMessage(`Algo salio mal con el inicio de sesion, por favor intenalo mas tarde`)
                setTimeout(() => {
                    setShowToast(false)
                }, 5000)
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { status } = error.response;
                if (status === 404) {
                    setIsLoading(false)
                    setBgToast('warning')
                    setShowToast(true)
                    setToastMessage(`El email ${values.email} no esta registrado`)
                    setTimeout(() => {
                        setShowToast(false)
                    }, 5000)
                } else if (status === 401) {
                    setBgToast('warning')
                    setIsLoading(false)
                    setShowToast(true)
                    setToastMessage(`Datos incorrectos, verifica tus datos eh intentalo de nuevo`)
                    setTimeout(() => {
                        setShowToast(false)
                    }, 5000)
                } else if (status === 500) {
                    setBgToast('danger')
                    setIsLoading(false)
                    setShowToast(true)
                    setToastMessage(`Algo salio mal con el inicio de sesion, por favor intenalo mas tarde`)
                    setTimeout(() => {
                        setShowToast(false)
                    }, 5000)
                }
            } else {
                setBgToast('danger')
                setIsLoading(false)
                setShowToast(true)
                setToastMessage(`Algo salio mal con el inicio de sesion, por favor intenalo mas tarde`)
                setTimeout(() => {
                    setShowToast(false)
                }, 5000)
            }


        } finally {
            setIsLoading(false)
        }

    }

    return (
        <>
            <ToastCammon
                bgToast={bgToast}
                setShowToast={setShowToast}
                showToast={showToast}
                toastMessage={toastMessage}
            />
            <Formik
                initialValues={{ email: "", password: "" }}
                validate={(values: ValuesSesion) => {
                    const errors: Partial<ValuesSesion> = {};
                    if (!values.email) {
                        errors.email = "¡Este campo no puede quedar vacio!";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = "Ingrese una dirección de correo válida";
                    }
                    if (!values.password) {
                        errors.password = "¡Este campo no puede quedar vacio!";
                    }
                    return errors;
                }}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-3">
                            <label
                                htmlFor="email-address-icon"
                                className="block my-1 pt-4 mx-1 text-sm font-medium text-gray-900 dark:text-white">
                                Correo electronico
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"></path>
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"></path>
                                    </svg>
                                </div>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="example@example.com"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm mt-1 "
                            />
                        </div>
                        <div className="mb-1">
                            <label
                                htmlFor="email-address-icon"
                                className="block my-1 mx-1 text-sm font-medium text-gray-900 dark:text-white">
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 -start-1 flex items-center ps-3.5 pointer-events-none">
                                    <svg
                                        className="w-6 h-6 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="evenodd"
                                            d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Ingrese su contraseña"
                                    className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm mt-1 "
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-700 w-full text-white mt-3 rounded-md py-[10px] text-xs md:text-sm uppercase hover:bg-blue-500 duration-150">
                            {isLoading ? (
                                <p className="text-xs uppercase font-normal">Validando datos...</p>
                            ) :
                                <p className="text-xs uppercase font-normal">Iniciar sesion</p>
                            }
                        </button>

                    </Form>
                )}
            </Formik>
        </>
    );
};


export default Auth