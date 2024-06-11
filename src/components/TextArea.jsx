import React from "react";
import Label from "./Label";

const TextArea = () => {
  return (
    <div>
      <Label title="Kritik dan Saran" />
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none h-32 lg:h-40"
        placeholder="Ketik pesan disini"
      ></textarea>
    </div>
  );
};

export default TextArea;
