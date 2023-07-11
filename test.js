
let solution=(A)=>{
    let max= 0;
    A.map((item, index)=>{
        if(item > max){
            max = item;
        }
    })
    return max;
}

console.log(solution([8, 24, 3, 20, 1, 17]));