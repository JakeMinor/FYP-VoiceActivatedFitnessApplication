<template>
  <div>
    <navigation-bar/>
    <div class="container vh-75">
      <router-view />
    </div>
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar";
export default {
  components: {NavigationBar}
}
</script>