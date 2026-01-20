"use client";
import { useParams } from "next/navigation";
import { useItemDetailsQuery } from "../../../components/UI/card/queries/use-item-details-query";
import Image from "next/image";

export default function ItemPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: item, isLoading, error } = useItemDetailsQuery(id);

  if (isLoading)
    return <div className="p-10 text-white">Загрузка данных об объекте...</div>;
  if (error || !item)
    return <div className="p-10 text-red-500">Объект не найден</div>;

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-blue-500">{item.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4">
            {item.photos && item.photos.length > 0 ? (
              item.photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-2xl overflow-hidden border border-stone-800"
                >
                  <Image
                    src={`http://localhost:3000${photo.url}`}
                    alt={photo.originalName}
                    fill
                    className="object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="aspect-video bg-stone-900 rounded-2xl flex items-center justify-center text-stone-500">
                Нет доступных фото
              </div>
            )}
          </div>

          <div className="bg-stone-950 p-6 rounded-3xl border border-stone-800">
            <h2 className="text-2xl font-semibold mb-4 border-b border-stone-800 pb-2">
              Характеристики
            </h2>
            <div className="space-y-3">
              <p>
                <span className="text-stone-400">Тип:</span>{" "}
                {item.content?.type}
              </p>
              <p>
                <span className="text-stone-400">Подтип:</span>{" "}
                {item.content?.subtype}
              </p>
              <p>
                <span className="text-stone-400">Размер:</span>{" "}
                {item.content?.size}
              </p>
              <p>
                <span className="text-stone-400">Статус:</span>{" "}
                {item.published ? "Опубликовано" : "Черновик"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
