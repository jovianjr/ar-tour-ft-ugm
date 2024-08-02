<script>
  import { ref } from 'vue';
  const voice = ref();

  const initVoice = () => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    voice.value = voices.findLast((o) => o.lang === 'id-ID') ?? voices[0];
  };

  const speak = (e) => {
    if (!voice.value) {
      initVoice();
    }
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterThis = new SpeechSynthesisUtterance(e);
    utterThis.voice = voice.value;
    synth.speak(utterThis);
  };

  export default {
    speak
  };
</script>
