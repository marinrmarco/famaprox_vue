<template>
    <div class="grid grid-cols-6 gap-8">
        <h1 class="font-pacifico text-5xl col-start-2 col-span-4">¿Podrás deducir el número?</h1>
        <p class="text-4xl col-start-2 col-span-4">❓❓❓❓</p>
        <h2 class="col-start-2 col-span-4">
            <strong>Pista: </strong>Se trata de un número de 4 cifras,
            cuyas cifras no se repiten y no comienza por 0 (cero)        
        </h2>
        <input class="text-4xl h-12 text-center col-start-2 col-span-4 bg-blue-100" 
            type="text"  
            v-model="numToTest"
            @paste="cutToFour"
            @keyup="validNumber" 
            placeholder="Ingresa el número"/>
        <button class="py-4 rounded-md bg-red-200 hover:bg-red-600 shadow-md col-start-3 col-span-2" @click="getResult">Lo tengo!</button>
    </div>
    <br>
    <hr>
    <div class="grid grid-cols-6">
        <h2 class="col-start-2 col-span-4 bg-blue-200 text-xl font-bold">Resultados</h2>
        <div class="col-start-2 bg-blue-400 font-bold">Intento</div>
        <div class="col-start-3 bg-blue-400 font-bold">Número</div>
        <div class="col-start-4 bg-blue-400 font-bold">Famas</div>
        <div class="col-start-5 bg-blue-400 font-bold">Aproximaciones</div>
    </div>
    <div class="grid grid-cols-6" v-for="(item, index) in items" :key="index">
        <div class="col-start-2">{{ index + 1 }}</div>
        <div class="col-start-3">{{ item.numero }}</div>
        <div class="col-start-4">{{item.famas}}</div>
        <div class="col-start-5">{{item.aprox}}</div>
    </div>
 </template>

<script>
    import numberService from '@/services/number'
    import { ref } from 'vue'
    export default {
        setup () {
            const numToTest = ref([])
            const items = ref([])
            const numToGuess = numberService.genNum()
            const pattern = /^(?!.*(\d).*\1)[1-9][0-9]{0,3}$/
            const getResult = () => {
                const num = numToTest.value
                items.value.push(numberService.compareNum(numToGuess, num))
                console.log(items.value)
            } 
            const reverseChanges = (event) => {
                alert('El número no puede comenzar con cero, debe tener una longitud de 4 y las cifras no deben repetirse')
                const start = event.srcElement.selectionStart - 1
                const position = event.srcElement.value.length - start
                const arr = Array.from(numToTest.value)
                arr.splice(3, arr.length - 4)
                console.log(start, position)
                arr.splice(start, position)
                numToTest.value = arr.join("").toString()
            }
            const validNumber = (event) =>{
                console.log(numToTest.value)
                console.log(event)
                const num = numToTest.value
                const res = pattern.test(num)
                //valida que no tenga más de 4 cifras
                if(num.length && !res && !event.code.includes('Backspace' || 'Delete' || 'Arrow')) {
                    //Eliminar última entrada              
                    reverseChanges(event)
                }
                if(num.length > 1 && numberService.hadRepeatedNum(numToTest.value)){
                    reverseChanges(event)
                }
            } 
            const cutToFour = (event) =>{
                alert('No es permitido pegar información')
                event.preventDefault()
            }
            return {
                numToTest,
                numToGuess,
                validNumber,
                cutToFour,
                items,
                getResult
            }        
        },
    }
</script>