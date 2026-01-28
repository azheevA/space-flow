"use client";
import Cropper from "react-easy-crop";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { getCroppedImg } from "../utils/crop-image";

export function AvatarCropModal({
  image,
  onClose,
  onSave,
}: {
  image: string;
  onClose: () => void;
  onSave: (file: File) => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixels, setPixels] = useState<any>(null);

  const handleSave = async () => {
    const blob = await getCroppedImg(image, pixels);
    onSave(new File([blob], "avatar.jpg", { type: "image/jpeg" }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="bg-[#0b0b14] p-6 rounded-2xl w-[500px]">
        <div className="relative w-full h-[300px]">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, p) => setPixels(p)}
          />
        </div>

        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(+e.target.value)}
          className="w-full mt-4"
        />

        <div className="flex gap-6 mt-5 w-full justify-center">
          <div className="flex gap-6">
            <Button onClick={handleSave} className="" variant="secondary">
              Сохранить
            </Button>
            <Button onClick={onClose} className="" variant="secondary">
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
