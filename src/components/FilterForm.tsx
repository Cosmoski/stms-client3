import { Button, Form, InputNumber, Select, Switch } from "antd";
import { useDeleteAllCompletedTasksMutation, useGetTasksQuery } from "../features/api-slice";
import { TaskQuery, TaskType } from "../models";
import { setGlobalState } from "../app/state";

export default function FilterForm () {
    const [deleteAllCompletedTasksRedux] = useDeleteAllCompletedTasksMutation();   

    async function DeleteAllCompleted () 
    {
      await deleteAllCompletedTasksRedux({});   
    }

    function FilterTasks(values:any) { 
        const taskQuery = new TaskQuery();
    
        if(values["completedEdit"] !== undefined)
          taskQuery.Completed = values["completedEdit"];
        if(values["priority"] === 0)
          values["priority"] = undefined;
        if(values["priority"] !== undefined)
          taskQuery.Priority = values["priority"];
        if(values["taskType"] !== undefined)
          taskQuery.TaskType = values["taskType"];  
   
         setGlobalState("filter", taskQuery);           
    }
   

return (
    <Form onFinish={FilterTasks} onReset={FilterTasks} layout="inline" key={"filterForm"}>    
        <Form.Item name="priority" >
            <InputNumber min={0} max={5} placeholder="Priorytet"/>
        </Form.Item>
        <Form.Item name="taskType" style={{ width: 'calc(10%)' }} >
            <Select placeholder="Typ zadania">
                {            
                    Object.values(TaskType).map((type) =>{
                        if(typeof type === 'string')
                        return (<Select.Option value={type} key={type}>{type}</Select.Option>);
                        })
                }
            </Select>
        </Form.Item>
        <Form.Item name="completedEdit" label="Zakończone">
            <Switch />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">Filtruj</Button>
        </Form.Item>
        <Form.Item>
            <Button htmlType="reset">Reset</Button>
        </Form.Item>
        <Button onClick={DeleteAllCompleted}>Usuń zakończone</Button>
    </Form>
)
}

