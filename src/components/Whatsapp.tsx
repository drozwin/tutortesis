import Link from "next/link";
import React, { useState } from "react";

export const Whatsapp = () => {
  const [open, setOpen] = useState(false);

  const phone = "75258593";
  const message = "Hola, quiero información sobre .....";

  return (
    <div className="fixed bottom-12  right-6 z-50">
      <Link
        href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
        target="_blank"
      >
        <img
          src="/assets/iconos/whatsapp.svg"
          width={55}
          className="hover:scale-110 transition-transform duration-300"
        />
      </Link>
    </div>
  );
};
