import axios from "axios";
import { AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";
import { FaListOl } from "react-icons/fa";
import "./index.css";
import { useState, MouseEvent, useEffect } from "react";
import { NewPedido } from "./components/NewPedido";
import { Pedido } from "./components/Pedido";

interface Item {
	quantidade: string
	item: string
}

function App() {
  const [newPedido, setNewPedido] = useState<number>(0);
  const [data, setData] = useState<Item[]>([])
  const [input, setInput] = useState<Item>({
    item: "",
    quantidade: ""
  })

  const handleNewPedido = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setNewPedido(0);
  };

  const [pedidos, setPedidos] = useState<Data[]>([]);

  const [id, setId] = useState<number>(0)

  const handleSeePedido = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, index: number) => {
    setId(index)
    await getData()
    setNewPedido(2)
  }

  const getData = async () => {
    const getPedido = "http://localhost:4000/api/pedido/" + id
    const getItem = "http://localhost:4000/api/item/" + id
    axios.get(getPedido).then((response) => {
      setInput(response.data)
    })

    axios.get(getItem).then((response) => {
      setData(response.data)
    })
  }

  useEffect(() => {
    axios.get("http://localhost:4000/api/pedido").then((response) => {
      setPedidos(response.data);
    });
  }, []);

  return (
    <div className="flex flex-row">
      <div className="text-center text-white text-5xl w-80 min-h-screen h-full bg-gray-800">
        <div className="flex flex-row text-center justify-center pt-10 gap-x-3">
          <FaListOl />
          <h1> Pedidos</h1>
        </div>
        {pedidos.map((pedido, index) => {
          return (
            <div
              className="flex justify-start mt-8 text-3xl hover:mx-2 hover:bg-gray-900 duration-300 rounded-full py-2 px-4"
              key={index}
            >
              <button onClick={(e) => {
                handleSeePedido(e, pedido.id)
              }}>
                #{pedido.id}: Pedido
              </button>
            </div>
          );
        })}
      </div>
      <div className="bg-gray-600 min-h-screen h-full w-full">
        {newPedido == 0 ? (
          <div className="p-7 flex flex-col gap-x-2">
            <div className="flex flex-row">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNewPedido(1);
                }}
                className="text-4xl hover:scale-105 hover:text-gray-900 text-gray-800"
              >
                <AiFillCloseCircle />
              </button>
              <h1 className="text-3xl text-gray-800">Fechar</h1>
            </div>

            <div className="mt-6">
              <NewPedido />
            </div>
          </div>
        ) : newPedido == 1 ? (
          <div className="flex text-center flex-col mt-64 justify-center items-center">
            <h1 className="text-5xl pb-4 text-gray-800">Novo Pedido</h1>
            <button
              onClick={(e) => handleNewPedido(e)}
              className="text-6xl hover:scale-105 hover:text-gray-900 text-gray-800"
            >
              <AiFillPlusCircle />
            </button>
          </div>
        ) : (
          <div className="p-7 flex flex-col gap-x-2">
            <div className="flex flex-row">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNewPedido(1);
                }}
                className="text-4xl hover:scale-105 hover:text-gray-900 text-gray-800"
              >
                <AiFillCloseCircle />
              </button>
              <h1 className="text-3xl text-gray-800">Fechar</h1>
            </div>

            <div className="mt-6">
              <Pedido id={id} data={data} input={input}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface Data {
  id: number;
  cliente: string;
  dataPedido: Date;
}

export default App;
