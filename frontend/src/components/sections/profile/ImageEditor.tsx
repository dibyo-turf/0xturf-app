import Overlay from "@/components/overlay";
import { useAppSelector } from "@/redux/hooks";
import { ChangeEvent, useState } from "react";
import PortfolioBackground from "@/assets/portfolio-bg.png";
type ImageChangeEventType = ChangeEvent<HTMLInputElement>;

function ImageEditor({
    getImageData,
}: {
    getImageData: (imageData: File | null) => void;
}) {
    const { user } = useAppSelector((state) => state.auth);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleImageChange = (e: ImageChangeEventType) => {
        const file = e.target.files && e.target.files[0];
        getImageData(file);
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (event: ProgressEvent<FileReader>) {
                if (
                    event.target &&
                    event.target.readyState === FileReader.DONE
                ) {
                    setImageSrc(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        } else {
            getImageData(null);
            alert("Please select a valid image.");
        }
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            {imageSrc ? (
                <>
                    <Overlay />
                    <img src={imageSrc} className="w-full h-full" />
                </>
            ) : user?.banner ? (
                <>
                    <Overlay />
                    <img src={user?.banner} className="w-full h-full" />
                </>
            ) : (
                <img
                    src={PortfolioBackground}
                    alt="bg"
                    className="absolute h-full w-full object-cover rounded-xl"
                />
            )}
            <span className="absolute top-[30px]  z-20 right-[70px] ">
                <label htmlFor="edit" className="cursor-pointer bg-transparent">
                    <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 16L4 20L8 19L19.586 7.414C19.9609 7.03895 20.1716 6.53033 20.1716 6C20.1716 5.46967 19.9609 4.96106 19.586 4.586L19.414 4.414C19.0389 4.03906 18.5303 3.82843 18 3.82843C17.4697 3.82843 16.9611 4.03906 16.586 4.414L5 16Z"
                            stroke="#BDBDBD"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M5 16L4 20L8 19L18 9L15 6L5 16Z"
                            fill="#BDBDBD"
                        />
                        <path
                            d="M15 6L18 9M13 20H21"
                            stroke="#BDBDBD"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </label>
            </span>
            <input
                type="file"
                style={{
                    visibility: "hidden",
                }}
                id="edit"
                accept="image/*"
                className="bg-transparent"
                onChange={handleImageChange}
            />
        </div>
    );
}

export default ImageEditor;
