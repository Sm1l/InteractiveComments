import React from "react";
import styles from "./App.module.scss";
import { Main } from "./components/Main";

interface MainProps {}

const App: React.FC<MainProps> = () => {
  return (
    <div className={styles.app}>
      {/* <Header/> */}
      <Main />
      {/* <Footer/> */}
    </div>
  );
};

export { App };
