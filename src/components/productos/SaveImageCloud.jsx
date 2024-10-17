import { Up } from "../icons/Up";

const cloudName = import.meta.env.PUBLIC_CLOUDNAME
const uploasPreset = import.meta.env.PUBLIC_UPLOAD_PRESET
const folder = import.meta.env.PUBLIC_FOLDER

export const SaveImageCloud = ({ setUpload }) => {
    const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: cloudName,
            uploadPreset: uploasPreset,
            sources: ['local'],
            multiple: false,
            folder: folder,
            cropping: true,
            showUploadMoreButton: false,
            resourceType: 'image',
            clientAllowedFormats: ["jpg", "png", "webp"],
            language: 'es',
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
