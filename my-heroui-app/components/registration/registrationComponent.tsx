"use client";
import clsx from "clsx";
import { FormEvent, useState } from "react";
import { IMaskInput } from "react-imask";
import { title } from "../primitives";

interface IFormData {
  name: string;
  phone: string;
  telegram: string;
}
export default function RegistrationComponent() {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    phone: "",
    telegram: "",
  });
  const [phoneInput, setPhoneInput] = useState("+7 ");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    setIsSubmitting(true);

    try {
      // await createRegistration(formData); добавить как будет серверная часть
      alert("Форма успешно отправлена!");

      setFormData({
        name: "",
        phone: "",
        telegram: "",
      });
      setPhoneInput("+7 ");
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      alert("Произошла ошибка при отправке формы");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className=" flex w-full ">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="
                w-full  px-5 py-2 rounded-full 
                bg-black text-white text-lg tracking-[0.2em]
                border-2 border-cyan-500/80
                shadow-[0_0_15px_rgba(6,182,212,0.4)]
                outline-none focus:border-cyan-400 
                focus:shadow-[0_0_25px_rgba(34,211,238,0.6)]
                transition-all duration-300
                "
            required
            placeholder="Ваше имя *"
          />
        </div>

        <div>
          <label className="block text-3xs font-medium  my-4">
            Оставьте ваши контакты
          </label>
          <IMaskInput
            mask="+{7} (000) 000-00-00"
            definitions={{
              "#": /[1-9]/,
            }}
            value={phoneInput}
            lazy={false}
            placeholderChar="_"
            className="
                w-full  px-5 py-2 rounded-full 
                bg-black text-white text-lg tracking-[0.2em]
                border-2 border-cyan-500/80
                shadow-[0_0_15px_rgba(6,182,212,0.4)]
                outline-none focus:border-cyan-400 
                focus:shadow-[0_0_25px_rgba(34,211,238,0.6)]
                transition-all duration-300
              "
            id="phone"
            unmask={true}
            onAccept={(value) => {
              setPhoneInput(value);
              setFormData((prev) => ({
                ...prev,
                phone: value,
              }));
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black- mb-1">
            Ваш никнейм в telegram
          </label>
          <input
            type="text"
            value={formData.telegram}
            onChange={(e) =>
              setFormData({ ...formData, telegram: e.target.value })
            }
            className="
                w-full  px-5 py-2 rounded-full 
                bg-black text-white text-lg tracking-[0.2em]
                border-2 border-cyan-500/80
                shadow-[0_0_15px_rgba(6,182,212,0.4)]
                outline-none focus:border-cyan-400 
                focus:shadow-[0_0_25px_rgba(34,211,238,0.6)]
                transition-all duration-300
               "
            placeholder="@username"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="privacy"
              className="mt-1 w-4 h-4 accent-brand-cyan border-brand-cyan bg-black "
              required
            />
            <label
              htmlFor="privacy"
              className=" ml-2 text-[10px] md:text-xs text-gray-400 leading-relaxed"
            >
              Я даю{" "}
              <a href="#" className="underline hover:text-white">
                согласие
              </a>{" "}
              на обработку моих персональных данных в форме обращения на
              странице сайта. Ознакомиться с условиями
              <br />
              <a href="#" className="underline hover:text-white ml-1">
                Политики обработки персональных данных ООО «НЬЮКОМ ДИСТРИБЬЮШН»
              </a>
            </label>
          </div>

          <p className="text-xs text-black-500">
            * Поля, обязательные для заполнения
          </p>
        </div>

        <button
          type="submit"
          className="  text-white font-semibold py-3 px-6 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Готово
        </button>
      </form>
    </div>
  );
}
