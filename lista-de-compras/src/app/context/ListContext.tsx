import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Item {
  id: number;
  name: string;
  complete: boolean;
}

export interface List {
  id: number;
  name: string;
  items: Item[];
}

interface ListsContextData {
  lists: List[];
  addList: (name: string) => void;
  renameList: (id: number, newName: string) => void;
  addItem: (listId: number, itemName: string) => void;
  toggleItem: (listId: number, itemId: number) => void;
  deleteItem: (listId: number, itemId: number) => void;
  deleteList: (listId: number) => void;
}

const ListsContext = createContext<ListsContextData | undefined>(undefined);

export function ListsProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<List[]>([]);

  // Criar nova lista
  function addList(name: string) {
    const newList: List = {
      id: Date.now(), // gera ID único
      name,
      items: [],
    };
    setLists((prev) => [...prev, newList]);
  }

  // Renomear lista
  function renameList(id: number, newName: string) {
    setLists((prev) =>
      prev.map((list) => (list.id === id ? { ...list, name: newName } : list))
    );
  }

  // Adicionar item em uma lista
  function addItem(listId: number, itemName: string) {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: [
                ...list.items,
                { id: Date.now(), name: itemName, complete: false },
              ],
            }
          : list
      )
    );
  }

  // Alternar item (completo/incompleto)
  function toggleItem(listId: number, itemId: number) {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId
                  ? { ...item, complete: !item.complete }
                  : item
              ),
            }
          : list
      )
    );
  }

  // Remover item
  function deleteItem(listId: number, itemId: number) {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, items: list.items.filter((i) => i.id !== itemId) }
          : list
      )
    );
  }

  // Remover list
  function deleteList(listId: number) {
    setLists((prev) => prev.filter((i) => i.id !== listId)
    );
  }

  return (
    <ListsContext.Provider
      value={{ lists, addList, renameList, addItem, toggleItem, deleteItem, deleteList }}
    >
      {children}
    </ListsContext.Provider>
  );
}

export function useLists() {
  const context = useContext(ListsContext);
  if (!context) {
    throw new Error("useLists deve ser usado dentro de ListsProvider");
  }
  return context;
}