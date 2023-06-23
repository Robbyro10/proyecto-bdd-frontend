import { useState, FC } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FiTrash2 } from 'react-icons/fi'
import { HiPlus } from 'react-icons/hi'
import { TelefonoModal } from './TelefonoModal';

interface Props {
    id: string;
    telefono: any;
}

export const TelefonoUi: FC<Props> = ({ id, telefono }) => {
    const [isTeleOpen, setIsTeleOpen] = useState(false);

    const deleteTelefono = () => {
        console.log("this is deletes a Telefono")
      };

  return (
    <>
    {telefono.cod_int ? (
        <>
          <div className="flex gap-2 items-baseline">
            <h2 className="font-bold text-xl mt-5">TELÉFONO</h2>
            <button
              onClick={() => setIsTeleOpen(true)}
              className="hover:scale-110 h-fit transition ease-out flex text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center"
            >
              <FaPencilAlt />
            </button>
            <button
              onClick={deleteTelefono}
              className="hover:scale-110 h-fit transition ease-out flex text-error"
            >
              <FiTrash2 />
            </button>
          </div>
          <p>
            +{telefono.cod_int}&nbsp;
            {telefono.cod_area}
            {telefono.numero}
          </p>
        </>
      ) : (
        <button onClick={() => setIsTeleOpen(true)} className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out">
          <HiPlus />
          Agregar Telefono
        </button>
      )}

        <TelefonoModal
        isOpen={isTeleOpen}
        onClose={() => setIsTeleOpen(false)}
        telefono={telefono}
        id={id}
        tipo="persona"
      />
    </>
  )
}
