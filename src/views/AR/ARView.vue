<script setup>
  // Library
  import * as turf from '@turf/turf'
  import { ref, onMounted, watch } from 'vue'
  // Component
  import AR from '@/components/AR.vue'
  import ARScene from '@/components/ARScene.vue'
  import speech from '@/components/SpeechSynthesis.vue'
  // View
  import CompassView from '@/views/AR/CompassView.vue'
  import HowToUseView from '@/views/AR/HowToUseView.vue'
  import InformationView from '@/views/AR/InformationView.vue'
  import MissionView from '@/views/AR/MissionView.vue'
  import OnboardingView from '@/views/AR/OnboardingView.vue'
  import NoInsideAreaView from '@/views/AR/NoInsideAreaView.vue'
  import NoGpsSupportView from '@/views/AR/NoGpsSupportView.vue'
  import CompleteView from '@/views/AR/CompleteView.vue'

  import dataScenario from '@/data/scenarios'

  const emit = defineEmits(['endApp'])

  const gpsSupport = ref(null)
  const initialization = ref(true)
  const onboarding = ref(true)
  const howToUseModal = ref(false)

  const lastSavedStep = ref()
  const currentStep = ref(0)
  const coordinates = ref({})

  onMounted(async () => {
    setupGps()
  })

  const setupApp = () => {
    if (onboarding.value && !initialization.value) {
      lastSavedStep.value = parseInt(localStorage.getItem('save-step'))
      let transcript =
        'Selamat datang di Augmented Reality Tour Fakultas Teknik Universitas Gadjah Mada. Silahkan pergi menuju Tugu Teknik untuk memulai tour.'
      if (lastSavedStep.value) {
        transcript += 'Anda juga dapat melanjutkan sesi anda sebelumnya dengan menggunakan tombol di bawah.'
      }
      speech.speak(transcript)
    } else if (onboarding.value && initialization.value) {
      speech.speak(
        'Mohon Maaf, Aplikasi ini hanya dapat digunakan pada lingkungan Fakultas Teknik Universitas Gadjah Mada.'
      )
    }
  }

  watch(onboarding, setupApp, { immediate: true })
  watch(initialization, setupApp, { immediate: true })

  const setupGps = () => {
    const gpsNotGranted = () => {
      gpsSupport.value = false
      speech.speak(
        'Mohon Maaf, Aplikasi membutuhkan perizinan lokasi. Silakan periksa kembali pengaturan perangkat anda, dan coba lagi.'
      )
    }

    if (navigator.geolocation) {
      gpsSupport.value = true
      navigator.geolocation.watchPosition((val) => {
        // Check If you inside polygon
        if (initialization.value) {
          checkGpsInitiate({
            latitude: val.coords.latitude,
            longitude: val.coords.longitude
          })
        } else {
          checkGps({
            latitude: val.coords.latitude,
            longitude: val.coords.longitude
          })
        }
      }, gpsNotGranted)
    } else gpsNotGranted
  }

  // check user is on ft, if Y then trigger initScenario
  const checkGpsInitiate = ({ latitude, longitude }) => {
    const point = turf.point([longitude, latitude])
    const center = [110.37228932557562, -7.765364531855143]
    const circle = turf.circle(center, 500, { units: 'meters' })
    const result = turf.pointsWithinPolygon(point, circle)

    if (result.features.length > 0) {
      initialization.value = false
      initScenario({
        latitude: latitude,
        longitude: longitude
      })
    }
  }

  // check use based on scenario
  const checkGps = ({ latitude, longitude }) => {
    const point = turf.point([longitude, latitude])
    const scenario = dataScenario[currentStep.value]

    let center = null
    if (scenario.type === 'initialization') {
      center = scenario.data.target
    } else if (scenario.type === 'direction') {
      center = scenario.data.targetArea
    } else {
      return
    }

    const circle = turf.circle(center, 20, { units: 'meters' })
    const result = turf.pointsWithinPolygon(point, circle)
    if (result.features.length > 0) {
      currentStep.value += 1
      coordinates.value = {}
      if (scenario.type === 'initialization') {
        onboarding.value = false
      }
      localStorage.setItem('save-step', currentStep.value) // save session
    }
  }

  // get path to first scenario
  const initScenario = async ({ latitude, longitude }) => {
    try {
      const target = dataScenario[currentStep.value].data.target
      const dest = {
        longitude: target[0],
        latitude: target[1]
      }

      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${longitude},${latitude};${dest.longitude},${dest.latitude}?alternatives=false&geometries=geojson&overview=full&steps=false&access_token=sk.eyJ1Ijoiam92aWFuanIiLCJhIjoiY2x5anhxdWtlMHVlcTJtcXlleWZ6c2JzZSJ9.GhAOBol6i0huQlEg3EMZrQ`
      )
      const body = await res.json()

      if (body.routes.length) {
        coordinates.value = {
          target: target,
          path: body.routes[0].geometry?.coordinates
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  // nextStep
  const nextStep = () => {
    currentStep.value += 1

    if (currentStep.value === dataScenario.length - 1) {
      speech.speak(
        'Selamat, anda telah menyelesaikan Augmented Reality Tour Fakultas Teknik Universitas Gadjah Mada. Terima kasih telah berkunjung, sampai jumpa di kedatangan anda berikutnya.'
        // "Selamat, anda telah menyelesaikan Augmented Reality Tour Fakultas Teknik Universitas Gadjah Mada. Sekarang, anda dapat menggunakan fitur free play untuk mengunjungi tempat di Fakultas Teknik secara bebas dengan menggunakan menu yang ada di halaman utama.",
      )
      return
    }

    coordinates.value = {
      path: dataScenario[currentStep.value].data.path,
      target: dataScenario[currentStep.value].data.target
    }
  }

  // Continue last saved
  const continueLastSaved = () => {
    onboarding.value = false
    currentStep.value = parseInt(lastSavedStep.value)
  }
</script>

<template>
  <div v-if="gpsSupport == true" class="z-0 relative h-svh w-svw bg-slate-900">
    <NoInsideAreaView v-if="initialization" />
    <div v-else>
      <div
        v-if="currentStep > 0 && currentStep < dataScenario.length - 2"
        class="absolute top-2 right-3 text-xs py-1 px-2 font-medium bg-slate-900 text-white border border-white flex items-center justify-center rounded-full"
      >
        {{ currentStep }} / {{ dataScenario.length - 1 }}
      </div>
      <CompassView />
      <InformationView
        v-if="currentStep > 0 && dataScenario[currentStep].type === 'scene'"
        :data="dataScenario[currentStep].data"
        @next="nextStep"
      />
      <MissionView
        v-if="currentStep > 0 && dataScenario[currentStep].type === 'direction'"
        :title="dataScenario[currentStep].data.title"
      />
      <AR :coordinates="coordinates" :active="currentStep > 0 && dataScenario[currentStep].type === 'direction'" />
      <ARScene :active="currentStep > 0 && dataScenario[currentStep].type === 'scene'" />
      <OnboardingView
        v-if="onboarding"
        class="absolute bottom-0 flex w-full"
        :lastSavedStep="lastSavedStep"
        @continueLastSaved="continueLastSaved"
        @toggleHowToUse="howToUseModal = !howToUseModal"
      />
      <HowToUseView v-if="howToUseModal" @close="howToUseModal = !howToUseModal" />
      <CompleteView v-if="currentStep === dataScenario.length - 1" @complete="emit('endApp')" />
    </div>
  </div>
  <NoGpsSupportView v-if="gpsSupport == false" />
</template>

<style>
  .ar-wrapper video {
    @apply !left-0 !top-0 !aspect-auto !h-full !w-full !object-cover;
  }
</style>
