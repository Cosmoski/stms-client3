import { Button, Form, Input, InputNumber, Radio, RadioChangeEvent,  Switch } from "antd";
import { useAddTasksMutation } from "../features/api-slice";
import { Task, TaskType } from "../models";
import { useState } from "react";

const AddTaskForm: React.FC = () => {
    
    const[formAdd] = Form.useForm(); 
    const[taskType, setTaskType] = useState(0);
    const radioOnChange = (e: RadioChangeEvent) => {
        setTaskType(e.target.value);
      };
    const [addNewTaskRedux] = useAddTasksMutation();
    async function addNewTask (values:any){    
        const newTask: Task = new Task(      
          values["description"], 
          values["taskType"], 
          values["priority"], 
          values["completed"], 
          false);
      
        let json:string = JSON.stringify(newTask);  
    
        addNewTaskRedux(json)
      
        formAdd.resetFields();
      }
      
return (
    <Form form={formAdd} onFinish={addNewTask}>
        <br/>
        <Form.Item name="description" rules={[{required:true,message:"Pole wymagane"}]}>
            <Input placeholder="Wpisz zadanie" style={{ width: 'calc(100% - 200px)' }}  />
        </Form.Item>
        <Form.Item name="taskType" label="Typ zadania " rules={[{required:true,message:"Pole wymagane"}]}>
            <Radio.Group onChange={radioOnChange} value={taskType}>     
                <Radio value={TaskType.EMAIL}>Email</Radio>
                <Radio value={TaskType.TELEFON}>Telefon</Radio>
                <Radio value={TaskType.ZADANIE}>Zadanie</Radio>  
            </Radio.Group>
        </Form.Item>
        <Form.Item name="priority" label="Priorytet" rules={[{required:true,message:"Pole wymagane"}]}>
            <InputNumber min={1} max={5}  />
        </Form.Item>
        <Form.Item name="completed" label="Zakończone">
            <Switch />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">Dodaj</Button>
        </Form.Item>
    </Form>   
    )
}

export default AddTaskForm;