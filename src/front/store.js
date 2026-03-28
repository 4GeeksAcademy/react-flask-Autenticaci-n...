export const initialStore = () => {
  return {
    token: sessionStorage.getItem("token") || null,
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_token":
      return {
        ...store,
        token: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo,
        ),
      };

    case "clear_token":
      return {
        ...store,
        token: null,
      };

    //si no se reconoce, se devuelve el estado anterior
    default:
      return store;
  }
}
