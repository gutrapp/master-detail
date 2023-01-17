import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios"

interface Item {
	quantidade: string
	item: string
}

export const Pedido = ({ id, data, input }: { id: number, data: Item[], input: Item }) => {
  const [items, setItems] = useState(data);

	console.log(input)
  const [cliente, setCliente] = useState<string>(input.item);

  const handleNewInput = () => {
    setItems([...items, { item: "", quantidade: "1" }]);
  };

  const handleRemoveInput = () => {
    const inputs = [...items];
    inputs.pop();
    setItems(inputs);
  };

  const handleChangeInputItem = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputs = [...items];
    inputs[index] = {
      item: e.target.value,
      quantidade: inputs[index].quantidade,
    };
    setItems(inputs);
  };

  const handleChangeInputQuantidade = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputs = [...items];
    inputs[index] = {
      item: inputs[index].item,
      quantidade: e.target.value,
    };
    setItems(inputs);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const updatePedido = "http://localhost:4000/api/pedido/" + id
		const updateItem = "http://localhost:4000/api/item/" + id

		await axios.put(updatePedido, {
			cliente, 
		}).then((response) => {
			const pedido = response.data

			items.map(async (singleItem, index) => {
				const { item, quantidade } = singleItem
				await axios.put(updateItem, {
					item,
					quantidade: parseInt(quantidade),
					pedidoId: pedido.id
				})
			})
		})
	};

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="text-white text-xl">
        <div className="w-full flex flex-col bg-slate-700 p-7 rounded-full">
          <label className="pb-3">Nome do Cliente:</label>
          <input
            className="text-gray-900 rounded-full px-3"
            required
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </div>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <div className="text-white text-l flex flex-row bg-slate-700 p-5 rounded-full gap-x-6 my-4">
                <div className="w-32 flex flex-col ">
                  <label className="pb-3">Quantidade:</label>
                  <input
                    className="text-gray-900 rounded-full px-3"
                    required
                    value={item.quantidade}
                    onChange={(e) => handleChangeInputQuantidade(e, index)}
                  />
                </div>

                <div className="w-full flex flex-col ">
                  <label className="pb-3">Nome do Item:</label>
                  <input
                    className="text-gray-900 rounded-full px-3"
                    required
                    value={item.item}
                    onChange={(e) => handleChangeInputItem(e, index)}
                  />
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-5">
          <button
            className="bg-slate-700 p-2 rounded-full mr-2"
            onClick={() => handleNewInput()}
          >
            + Item
          </button>
          <button
            className="bg-slate-700 p-2 rounded-full mr-[310px]"
            onClick={() => handleRemoveInput()}
          >
            - Remove Item
          </button>

          <button type="submit" className="bg-slate-700 px-4 py-2 rounded-full ml-96">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
