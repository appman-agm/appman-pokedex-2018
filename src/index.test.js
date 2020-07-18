import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Enzyme from "enzyme";
import { Provider } from "react-redux";
import { store } from "./store";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

test("renders with App and root div", () => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
  require("./index.js");
  ReactDOM.unmountComponentAtNode(root);
});
