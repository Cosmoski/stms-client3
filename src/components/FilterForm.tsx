import { Button, Form, InputNumber, Select, Switch } from "antd";
import { useDeleteAllCompletedTasksMutation, useGetTasksQuery } from "../features/api-slice";
import { TaskQuery, TaskType } from "../models";

export default function FilterForm () {
    const {data: getAllTasksRedux} = useGetTasksQuery(new TaskQuery());
    const [deleteAllCompletedTasksRedux] = useDeleteAllCompletedTasksMutation();   

    async function DeleteAllCompleted () 
    {
      await deleteAllCompletedTasksRedux({});   
    }

    async function FilterTasks(values:any) { 
        const taskQuery = new TaskQuery();
    
        if(values["completed"] !== undefined)
          taskQuery.Completed = values["completed"];
        if(values["priority"] === 0)
          values["priority"] = undefined;
        if(values["priority"] !== undefined)
          taskQuery.Priority = values["priority"];
        if(values["taskType"] !== undefined)
          taskQuery.TaskType = values["taskType"];  
    
          await useGetTasksQuery(taskQuery);     
    }
  

return (
    <Form onFinish={FilterTasks} onReset={FilterTasks} layout="inline">   
        <Form.Item name="priority" >
            <InputNumber min={0} max={5} placeholder="Priorytet"/>
        </Form.Item>
        <Form.Item name="taskType" style={{ width: 'calc(10%)' }} >
            <Select placeholder="Typ zadania">
                {            
                    Object.values(TaskType).map((type) =>{
                        if(typeof type === 'string')
                        return (<option value={type} key={type}>{type}</option>);
                        })
                }
            </Select>
        </Form.Item>
        <Form.Item name="completed" label="Zakończone">
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

