import React from "react";
import ReactDom from "react-dom";
import { connect, Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import { chatReducer } from "./reducer";
import { sendMessage, ChatState } from "./types";

const rootReducer = combineReducers({
  chat: chatReducer,
});

type reducerType = typeof rootReducer;

const store = createStore(rootReducer);

store.dispatch({
  type: "SEND_MESSAGE",
});

export type AppState = ReturnType<reducerType>;

const wrap = connect(
  (state: AppState) => ({
    chat: state.chat,
  }),
  dispatch => ({dispatch})
);

interface AppProps {
  chat: ChatState;
  dispatch: Function
}

const Count: React.FC<AppProps> = props => {
  const { chat, dispatch } = props;

  const messageAction = sendMessage({
    user: "ssh",
    message: "aa",
    timestamp: 2,
  });

  return (
    <div>
      聊天现在是
      {chat.messages.map(message => {
        return <span>{message && message.message}</span>;
      })}
      <button onClick={() => dispatch(messageAction)}>发送消息</button>
    </div>
  );
};

const Connected = wrap(Count);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Connected />
    </Provider>
  );
};

ReactDom.render(<App />, document.getElementById("app"));
