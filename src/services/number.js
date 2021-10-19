const CryptoJS = require('crypto-js')

const numberService = {}
const key = 'lapalabraloca'

numberService.genNum = () =>{
    let numToGuess = []
    let num
    for(let i = 0; i < 4; i++){
        if (i === 0){
            numToGuess.push(Math.floor(Math.random() * 9 + 1).toString()) //Numero aleatorio entre el 1 y el 9
        }else{  
            do num = Math.floor(Math.random() * 9) //Numero aleatorio entre el 0 y el 9
            while (numToGuess.includes(num.toString()))
            numToGuess.push(num.toString())
        }
    }

   // console.log(numToGuess);
   // console.log(numberService.encryptNum(numToGuess))
    return numberService.encryptNum(numToGuess);
}

numberService.encryptNum = (num) => {
    return num.map(n => CryptoJS.AES.encrypt(n, key).toString())
}

numberService.decryptNum = (num) => {
    const bytes = num.map(n => CryptoJS.AES.decrypt(n, key))
    return bytes.map(b => b.toString(CryptoJS.enc.Utf8))
}

//la siguiente funcion devuelve un arreglo con la cantidad de famas y aprox
numberService.compareNum = (numToGuess, numToTest) =>{
   // console.log(numToTest)
    const testNum = Array.from(numToTest)
    
    const numToGuessDec = numberService.decryptNum(numToGuess)
   // console.log(testNum, numToGuessDec)
    let fama = 0
    let aprox = 0    
    //comparar los arreglos
    for(let i=0; i<4; i++){
        if(numToGuessDec[i]===testNum[i]){
            fama += 1
        }else if(numToGuessDec.includes(testNum[i])){
            aprox += 1
        }
    }
    return {'numero': numToTest, 'famas': fama, 'aprox': aprox}
}

export default numberService