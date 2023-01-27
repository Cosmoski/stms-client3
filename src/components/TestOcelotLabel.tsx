import { useState } from "react";
import { useTestOcelotQuery } from "../features/api-slice";

export default function TestOcelotLabel () {

    const {data} = useTestOcelotQuery(); 
  
    let content = JSON.stringify(data);
    console.log(data);
    console.log(content);

    return ( 
        <div>
            <h5> {content}</h5>               

        </div>  

    )
}
