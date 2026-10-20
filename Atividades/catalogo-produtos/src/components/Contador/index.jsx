import { useState } from "react";

function Contador() {
    const [quantidade, setQuantidade] = useState(0);

    function incrementar() {
        setQuantidade(quantidade + 1);
        console.log(quantidade + 1);
    }

    return (
        <div>
            <p>Quantidade: {quantidade}</p>
            <button onClick={incrementar}>
                Incrementar
            </button>
        </div>
    );
}

export default Contador;
