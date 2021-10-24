<template>
    <resultados :items="items"/>
    <div class="container max-w-screen-sm w-3/4 mx-auto m-10 bg-blue-200 p-8 rounded-md">
        <input class="max-w-screen-sm w-3/4 mx-auto text-lg md:text-4xl h-20 text-center col-start-2 col-span-4 bg-blue-100 m-4" 
        type="text"  
        v-model="numToTest"
        disabled 
        placeholder="Ingresa el número"/>
        <div class="grid w-full grid-cols-3 gap-4 w-10/12">
            <div :disabled="keys[1].pressed" :class="[keys[1].pressed ? clsPressed : cls]" 
                 @click="pressButton(1)">1
            </div>
            <div :class="[keys[2].pressed ? clsPressed : cls]" 
                 @click="pressButton(2)">2
            </div>
            <div :class="[keys[3].pressed ? clsPressed : cls]" 
                 @click="pressButton(3)">3
            </div>
            <div :class="[keys[4].pressed ? clsPressed : cls]" 
                 @click="pressButton(4)">4
            </div>
            <div :class="[keys[5].pressed ? clsPressed : cls]" 
                 @click="pressButton(5)">5
            </div>
            <div :class="[keys[6].pressed ? clsPressed : cls]" 
                 @click="pressButton(6)">6
            </div>
            <div :class="[keys[7].pressed ? clsPressed : cls]" 
                 @click="pressButton(7)">7
            </div>
            <div :class="[keys[8].pressed ? clsPressed : cls]" 
                 @click="pressButton(8)">8
            </div>
            <div :class="[keys[9].pressed ? clsPressed : cls]" 
                 @click="pressButton(9)">9
            </div>
            <div :class="cls"
                 @click="deleteAll"
            >Cancelar</div>
            <div :class="[keys[0].pressed ? clsPressed : cls]" 
                 @click="pressButton(0)">0
            </div>
            <div :class="cls"
                 @click="backSpace">◄
            </div>

            <div :class="cls"
                v-if="showTestButton"
                @click="testNumber"
                >¡Lo Tengo!</div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue' 
import numberService from '@/services/number'
import Resultados from '@/components/resultados.vue';
export default {
    components: {
        Resultados
    },
    setup() {
        const cls = ref("bg-blue-600 cursor-pointer flex h-14 justify-center text-white font-extrabold round-md items-center")
        const clsPressed = ref("bg-red-300 cursor-not-allowed flex h-14 justify-center text-black font-extrabold round-md items-center")
        const items = ref([])
        const keys = ref([
            {
                val: 0,
                pressed: false
            },
            {
                val: 1,
                pressed: false
            },
            {
                val: 2,
                pressed: false
            },
            {
                val: 3,
                pressed: false
            },
            {
                val: 4,
                pressed: false
            },
            {
                val: 5,
                pressed: false
            },
            {
                val: 6,
                pressed: false
            },
            {
                val: 7,
                pressed: false
            },
            {
                val: 8,
                pressed: false
            },
            {
                val: 9,
                pressed: false
            },
        ])    
        const numToTest = ref('')
        let numToTestArr = []
        const showTestButton = ref(false)
        const pressButton = (num) => {
            /* Validaciones:
            3) Que no se repitan los números
            4) Que no tenga caracteres diferentes a números del 0 al 9
            */
           if (!keys.value[num].pressed){
               // Que el primer número no sea 0
                if (numToTestArr.length === 0 && num === 0){
                   alert('El número no puede comenzar por cero (0)')
                   return false
                }

                //Que tenga 4 cifras
                if (numToTestArr.length === 4){
                   alert('El número debe tener 4 cifras')
                   return false
                }
                numToTestArr.push(num)
           }else{
                numToTestArr.splice(numToTestArr.indexOf(num), 1)
                if (numToTestArr[0] === 0){
                    alert('El número no puede comenzar por cero (0), también se eliminará el cero')
                    numToTestArr.splice(0, 1)
                    keys.value[0].pressed = false
                }
           }
            keys.value[num].pressed = !keys.value[num].pressed
            numToTest.value = numToTestArr.join('')
            validNumber()
        }
        const deleteAll = () => {
            keys.value.forEach(e => {
                e.pressed = false                
            });
            numToTestArr = []
            numToTest.value = ''
        }
        const backSpace = () => {
            const num = numToTest.value[numToTest.value.length - 1]
            pressButton(num)
        }
        const validNumber = () =>{
            const num = numToTest.value
            showTestButton.value = !numberService.invalidNumber(num)
        } 
        const testNumber = () => {
            items.value.push(numberService.compareNum(numToTest.value))
            deleteAll()
            showTestButton.value = false
        }

        //Se genera el número al crear el componente
        numberService.genNum()
        return {
            keys,
            items,
            cls,
            clsPressed,
            numToTest,
            showTestButton,
            testNumber,
            pressButton,
            deleteAll,
            backSpace,
            validNumber,
        }
    }
}
</script>
