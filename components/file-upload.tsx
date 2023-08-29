"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import { on } from "events";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: "messageFile" | "serverImage";
    value: string;
}
const FileUpload = ({ onChange, endpoint, value }: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    if (value && fileType !== "pdf") {
        return (
            <div className="relative w-20 h-20 ">
                <Image
                    src={value}
                    fill
                    objectFit="cover"
                    alt="Server Image"
                    className="rounded-full"
                />
                <button
                    onClick={() => onChange("")}
                    type="button"
                    className="bg-rose-500 text-white p-1 absolute top-0 rounded-full"
                >
                    <X />
                </button>
            </div>
        );
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    );
};

export default FileUpload;
