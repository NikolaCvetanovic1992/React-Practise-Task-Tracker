import React, { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const httpData = useHttp();

  const { isLoading, error, sendRequest } = httpData;

  useEffect(() => {
    const transformTask = (taskObj) => {
      const loadedTasks = [];

      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };
    sendRequest(
      {
        url: "https://react-http-25971-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      },
      transformTask
    );
  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
