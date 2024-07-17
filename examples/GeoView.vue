<script>
export default {
  data() {
    return {
      gpsSupport: null,
      gpsCoordinate: {},
    };
  },
  mounted() {
    if (navigator.geolocation) {
      this.gpsSupport = true;
      navigator.geolocation.watchPosition((val) => {
        console.log(val);
        this.gpsCoordinate = val.coords;
      });
    } else {
      this.gpsSupport = false;
    }
  },
};
</script>

<template>
  <div
    class="flex h-[100svh] w-[100svw] items-center justify-center bg-slate-900 text-white"
  >
    <div v-if="gpsSupport">
      <p>Latitude: {{ this.gpsCoordinate.latitude }}</p>
      <p>Longitude: {{ this.gpsCoordinate.longitude }}</p>
    </div>
    <div v-else class="text-red-500">This Browser Doesn't support GPS</div>
    {{ gpsSupport ? "" : "This Browser Doesn't support GPS" }}
  </div>
</template>
