import { Button, Form, Input, InputNumber, Radio, RadioChangeEvent, Space, Switch, Table } from "antd";
import { useDeleteTasksMutation, useGetTasksQuery, useSetTaskAsCompletedMutation, useUpdateTasksMutation } from "../features/api-slice";
import { Task, TaskQuery, TaskType } from "../models";
import { useState } from "react";
import { MinusCircleOutlined} from '@ant-design/icons';


const TaskListForm: React.FC = () =>
{
    const {data: getAllTasksRedux} = useGetTasksQuery(new TaskQuery());
    const [setTaskAsCompletedRedux] = useSetTaskAsCompletedMutation();
    const [deleteTaskRedux] = useDeleteTasksMutation();
    const [updateTaskRedux] = useUpdateTasksMutation();
    const[form] = Form.useForm();
    const[taskTypeEdit, setTaskTypeEdit] = useState(0);
    const[editingRow, setEditingRow] = useState(null);
    const radioOnChangeEdit = (e: RadioChangeEvent) => {
        setTaskTypeEdit(e.target.value);
      }; 
    async function updateTask (values:any){    
    const changeTask: Task = new Task(
        values["description"], 
        values["taskType"], 
        values["priority"], 
        values["completed"], 
        false,
        values["id"]);    
    
    let json:string = JSON.stringify(changeTask);

    updateTaskRedux(changeTask);

    setEditingRow(null);
    }
      
    const columns:any = [
        {
          title: "Id",
          dataIndex: "id",
          render: (text:any, record:any) =>{
            if(editingRow === record.id){
              return (
                <Form.Item
                  name="id"
                > <p>{text}</p></Form.Item>
              );
            } else {
              return <p>{text}</p>
            }
          }
        },
        {
          title: "Opis",
          dataIndex: "description",
          render: (text:any, record:any) =>{
            if(editingRow === record.id){
              return (
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required:true,
                      message: "Pole wymagane"
                    }
                  ]}><Input/></Form.Item>
              );
            } else {
              return <p>{text}</p>
            }
          }
        },
        {
          title: "Typ",
          dataIndex: "taskType",
          render: (text:any, record:any) =>{        
            if(editingRow === record.id){
              return (
                <Form.Item
                  name="taskType"
                  rules={[
                    {
                      required:true,
                      message: "Pole wymagane"
                    }
                  ]}>                
                  <Radio.Group onChange={radioOnChangeEdit} value={taskTypeEdit} >
                  <Space direction="vertical">
                    <Radio value={TaskType.EMAIL}>Email</Radio>
                    <Radio value={TaskType.TELEFON}>Telefon</Radio>
                    <Radio value={TaskType.ZADANIE}>Zadanie</Radio>         
                  </Space>
                </Radio.Group></Form.Item>
              );
            } else {
              return <p>{TaskType[text]}</p>
            }
          }
        },    
        {
          title: "Priorytet",
          dataIndex: "priority",
          render: (text:any, record:any) =>{
            if(editingRow === record.id){
              return (
                <Form.Item
                  name="priority"
                  rules={[
                    {
                      required:true,
                      message: "Pole wymagane"
                    }
                  ]}><InputNumber min={1} max={5} /></Form.Item>
              );
            } else {
              return <p>{text}</p>
            }
          }
        },
        {
          title: "Zakończone",
          dataIndex: "completed",
          render: (text:any, record:any) =>{
            if(editingRow === record.id){
              return (
                <Form.Item
                  name="completed"
                  rules={[
                    {
                      required:true,
                      message: "Pole wymagane"
                    }]}              
                    ><Switch defaultChecked={record.completed}/></Form.Item>
              );
            } else {
              return <p>{String(text)}</p>
            }
          }
        },
        {
          title: "",
          render: (_:any, record:any) =>{
            return (
              <>
                <Button   
                  type="link" 
                  onClick={() => {
                    setEditingRow(record.id);
                    form.setFieldsValue({
                      id: record.id,
                      description: record.description,
                      taskType: record.taskType,
                      priority: record.priority,
                      completed: record.completed
                    });
                }}> Edit</Button>
                <Button type="link" htmlType="submit">
                  Save
                </Button>
                <Button   
                  type="link" 
                  onClick={() => {         
                  setTaskAsCompletedRedux(record.id);      
                }}> Zakończ zadanie</Button>
                <MinusCircleOutlined style={{color:"red"}}
                  onClick={() => {    
                    deleteTaskRedux(record.id);
                }}/>
              </>
            );
          }
        },
      ];

      return (
        <Form form={form} onFinish={updateTask}>
            <Table columns={columns} dataSource={getAllTasksRedux} key={"table1"}/>
        </Form>
      )

}

export default TaskListForm;