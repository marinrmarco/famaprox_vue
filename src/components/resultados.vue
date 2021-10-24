<template>
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
export default {
    props: {
        items: Array
    }
}
</script>