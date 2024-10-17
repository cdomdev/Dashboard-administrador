import { Up } from "../icons/Up";

const cloudName = import.meta.env.PUBLIC_CLOUDNAME
const uploasPreset = import.meta.env.PUBLIC_UPLOAD_PRESET
const folder = import.meta.env.PUBLIC_FOLDER

export const SaveImageCloud = ({ setUpload }) => {
    const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: cloudName,
            uploadPreset: uploasPreset,
            folder: folder,
            sources: ['local'],
            multiple: false,
            cropping: true,
            showUploadMoreButton: false,
            resourceType: 'image',
            language: 'es',
            transformation: [{ width: 800, crop: 'limit', quality: 'auto', format: 'auto' }],
            text: {
                es: {
                    or: "O",
                    menu: {
                        files: "Subir desde tu dispositivo",
                    },
                    local: {
                        browse: "Seleccionar",
                        dd_title_single: "Arrastra tu imagen aquí",
                    },
                    crop: {
                        title: "Recortar",
                        crop_btn: "Recortar",
                        reset_btn: "Reiniciar",
                        skip_btn: "Continuar",
                        close_btn: "Si",
                        close_prompt: "¿Esta seguro?, al cerrar se cancelara la carga de la imagen",
                    }
                },
            },
        },
        (error, result) => {
            if (!error && result && result.event === 'success') {
                setUpload(result);
            }
        }
    );

    const handleUploadClick = () => {
        widget.open();
    };

    console.log(handleUploadClick)

    return (
        <button
            onClick={handleUploadClick}
            className="text-sm flex items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-500 duration-150"
        >
            <Up />
            <span className="ml-2">Cargar Imagen</span>
        </button>
    );
};
