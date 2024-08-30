const getData=document.getElementById('Play-button');
getData.addEventListener("click",fetchData);
const resetSolve=document.getElementById('reset-button');
resetSolve.addEventListener("click",reset)
let stopwork=false;



//displaying  the chess board
function addChessBox(data){
    const main_element=document.getElementById("main-body");
    const chessBody=document.createElement("div");
    main_element.appendChild(chessBody);
    let flag=true;
    chessBody.classList.add("chess_box")
    chessBody.style["grid-template-columns"]=`repeat(${data},1fr)`
    for(let i=0;i<data;i++){
        let f1=flag;
        for(let j=0;j<data;j++){
            const box=document.createElement('div')
            const para=document.createElement('p');
            para.innerHTML="";
            box.appendChild(para);
            if(f1){
                box.classList.add('white-box');

            }
            else{
                box.classList.add('black-box');

            }
            f1=!f1;
            chessBody.appendChild(box)

        }
        flag=!flag;
    }
    const chessBoxes=chessBody.childNodes;
    NQueenSolver(chessBoxes,data);

}
//displaying the Solutions
function insertans(chessBoxes,data){
    const main_element=document.getElementById("main-body");
    const ansBody=document.createElement("div");
    main_element.appendChild(ansBody);
    let flag=true;
    ansBody.classList.add("chess_box")
    ansBody.style["grid-template-columns"]=`repeat(${data},1fr)`
    for(let i=0;i<data;i++){
        let f1=flag;
        for(let j=0;j<data;j++){
            const box=document.createElement('div')
            const para=document.createElement('p')
            box.appendChild(para)
            if(f1){
                box.classList.add('white-box');

            }
            else{
                box.classList.add('black-box');

            }
            f1=!f1;
            ansBody.appendChild(box)

        }
        flag=!flag;
    }
    const child=ansBody.childNodes
    for(let i=0;i<child.length;i++){
        child[i].firstChild.innerHTML=chessBoxes[i].firstChild.innerHTML
    }


}
//check for valid position
async function check(mat,row,col,checkBoxes,data){
    for(let i=row-1;i>=0;i--){
        if(mat[i][col]==='Q'){
            checkBoxes[data*i+col].style.backgroundColor="red";
            const p=await new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve(1)
            },1000)})
            if(checkBoxes[data*i+col].classList.contains("white-box")){
                checkBoxes[data*i+col].style.backgroundColor="rgb(169, 187, 132)"


            }
            else{
                checkBoxes[data*i+col].style.backgroundColor="cadetblue"

            }
            

            return false;
        }
    }
    let j=col-1;
    for(let i=row-1;i>=0;i--){
        if(i>=0 && j>=0){
            if(mat[i][j]==='Q'){
                checkBoxes[data*i+j].style.backgroundColor="red";
                const p=await new Promise((resolve)=>{
                    setTimeout(()=>{
                        resolve(1)
                    
    
                },1000)})
                if(checkBoxes[data*i+j].classList.contains("white-box")){
                    checkBoxes[data*i+j].style.backgroundColor="rgb(169, 187, 132)"
    
    
                }
                else{
                    checkBoxes[data*i+j].style.backgroundColor="cadetblue"
    
                }
                return false;
            }
            j--;
            
        }
        else{
            break;
        }

    }
    let k=col+1;
    for(let i=row-1;i>=0;i--){
        if(i>=0 && k<mat[0].length){
            if(mat[i][k]==='Q'){
                checkBoxes[data*i+k].style.backgroundColor="red";
                const p=await new Promise((resolve)=>{
                    setTimeout(()=>{
                        resolve(1)
    
                },1000)})
                if(checkBoxes[data*i+k].classList.contains("white-box")){
                    checkBoxes[data*i+k].style.backgroundColor="rgb(169, 187, 132)"
    
    
                }
                else{
                    checkBoxes[data*i+k].style.backgroundColor="cadetblue"
    
                }

                return false;
            }
            k++;
        }
        else{
            break;
        }

    }
    return true;
}
//running n queen algorithm...
async function solve(mat,data,chessBoxes,j){
    if(j===data){
        if(stopwork){
            return;
        }
        insertans(chessBoxes,data);
        return true;
    }
    if(!stopwork){
        for(let i=0;i<data;i++){
            mat[j][i]='Q';
            chessBoxes[j*data+i].firstChild.innerHTML='Q'
            if(stopwork){
                return
            }
            let f1=await new Promise((resolve)=>{
                setTimeout(()=>{
                resolve(check(mat,j,i,chessBoxes,data));
            },1000)})
            if(f1){
                let flag=await new Promise((resolve)=>{
                    setTimeout(()=>{
                    resolve(solve(mat,data,chessBoxes,j+1));
                },1000)});
                if(flag){
                    //copy the board....
                }
            }
            mat[j][i]='.';
            chessBoxes[j*data+i].firstChild.innerHTML='';
                        
        }

    }
    else{
        return

    }
    
            
}
async function showSolve(mat,data,chessBoxes,j){
    await solve(mat,data,chessBoxes,j);
    const p=document.getElementById("main-body")
    p.removeChild(p.firstChild)
}
function NQueenSolver(chessBoxes,data){
    const mat=[];
    for(let i=0;i<data;i++){
        const arr=[];
        for(let j=0;j<data;j++){
            arr.push('.');
        }
        mat.push(arr);
        
    }
    let j=0
    showSolve(mat,data,chessBoxes,j)

    
    

    

    //solve(mat,data,chessBoxes,j)

}

//reseting the game...
async function reset(event){
    window.stop();
    const main_element=document.getElementById("main-body");
    let k=main_element.childNodes.length;
    for(let i=0;i<k;i++){
        main_element.removeChild(main_element.firstChild)
    }
    stopwork=true;
    getData.addEventListener("click",fetchData);
}
//validating the number entered....
function isValid(data){
    if(data===0 || Number.isNaN(data)){
        return false
    }
    return true;
}
//fetching the number entered by user....
function fetchData(event){
    stopwork=false;
    const main_element=document.getElementById("main-body")
    if(main_element.hasChildNodes()){
        main_element.removeChild(main_element.firstChild)
    }
    getData.removeEventListener("click",fetchData)

    const formData=document.getElementById('queens-no');
    const data=parseInt(formData.value);
    console.log(data)
    if(isValid(data)){
        console.log('number');
    }
    else{
        alert("please enter a valid value");
        getData.addEventListener("click",fetchData);
        return;
    }
    
    
    addChessBox(data);    


}