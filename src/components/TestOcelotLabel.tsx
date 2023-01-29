import { useTestOcelotQuery } from "../features/api-slice";
import { TestOcelotMsg } from "../models";

export default function TestOcelotLabel () {

    const {data} = useTestOcelotQuery(); 
  
    let content = JSON.stringify(data);
    //console.log(content);
    let stringSplit:string = ''
    if(typeof content !== 'undefined')
        stringSplit = content.substring(8, 49);


    return ( 
        <div key={stringSplit.length}>
            <h5> {stringSplit}</h5>   
        </div>  

    )
}
