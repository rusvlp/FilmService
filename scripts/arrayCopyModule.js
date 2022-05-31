export default function copy(array){
    let newArray = [];
    for (let i = 0; i<array.length; i++){
        newArray[i] = array[i];
    }
    return newArray;
}

