import React, { useState } from 'react';
import {
    XMarkIcon
} from "@heroicons/react/24/outline";


function Contact({ onEnviar }) {
    const [nombre, setNombre] = useState('');
    const [contacto, setContacto] = useState('');
    const [enviado, setEnviado] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Puedes realizar acciones con los valores de 'nombre' y 'contacto' aquí, como enviarlos a un servidor o mostrarlos en la página.
        // console.log(`Nombre: ${nombre}`);
        // console.log(`Contacto: ${contacto}`);
        onEnviar(nombre, contacto);
        setEnviado(true);
    };

    const closeForm = () => {
        document.getElementById('idd').close()
        setEnviado(false);
        setNombre('');
        setContacto('');
    };

    return (
        <div>
            {
                //<h1 className="title-form">Antes de enviar</h1>
            }
            {enviado ? (
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: "right"
                    }}>
                        <XMarkIcon style={{
                            width: "20px",
                            cursor: "pointer",
                        }} onClick={closeForm} />
                    </div>
                    <p className="text-form">¡Gracias por enviar tu dibujo, mira la pantalla!</p>
                    {
                        //<button onClick={closeForm} className='button-form'>Cerrar</button>
                    }
                </div>
            ) : (
                <form onSubmit={handleSubmit}
                    style={{
                        width: "50vw",
                        height: "25vh",
                    }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: "right"
                    }}>
                        <XMarkIcon style={{
                            width: "20px",
                            cursor: "pointer",
                        }} onClick={closeForm} />
                    </div>

                    <div style={{
                        padding: "5px"
                    }}>
                        <label htmlFor="nombre">Nombre:</label>
                        <br></br>
                        <input className='input-form'
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{
                        padding: "5px"
                    }}>
                        <label htmlFor="contacto">Contacto:</label>
                        <br></br>
                        <input className='input-form'
                            type="text"
                            id="contacto"
                            value={contacto}
                            onChange={(e) => setContacto(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <button type="submit" className='button-form'>Enviar</button>
                        {
                            //<button onClick={closeForm} className='button-form'>Cerrar</button>
                        }
                    </div>
                </form>

            )}

        </div>
    );
}

export default Contact;