<template>
    <div class="grid justify-items-center">
        <h1 class="font-pacifico text-tp">¿Podrás deducir el número?</h1>
        <p>❓❓❓❓</p>
        <form action="">
            <input class="text-tp text-center" type="text" v-model="numToTest" placeholder="Ingresa el número">
            <button class="py-4 px-8 rounded-md bg-red-200 hover:bg-red-600 shadow-md" @click="getResult">Lo tengo!</button>
        </form>
    </div>
</template>

<script>
import numberService from '@/services/number'
import { ref } from 'vue'
export default {
    setup () {
        const numToTest = ref([])
        const numToGuess = numberService.genNum()
        const getResult = () => {
            const num = numToTest.value
            numberService.compareNum(numToGuess, num)
        } 
        return {
            numToTest,
            numToGuess,
            getResult
        }        
    },
}
</script>