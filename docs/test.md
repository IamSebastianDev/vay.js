<!-- @format -->

<script setup>
    import {data} from "./test.data.ts";
    console.log({data})
</script>

<DependencyExplorer :deps="data.dependencies"/>
