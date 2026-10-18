<script lang="ts"></script>

<template>
  <div class="credits-container">
    <h2>SPECIAL THANKS</h2>

    <table class="credits-table">
      <tbody>
        <tr>
          <td class="credit-target">
            <a href="https://www.arrowheadgamestudios.com/" target="_blank"
              >Arrowhead Game Studios</a
            >
          </td>
          <td class="credit-reason">Inspiration, idea, fun and amazing game: Helldivers 2</td>
        </tr>
        <tr>
          <td class="credit-target">
            <a href="https://helldivers.wiki.gg/" target="_blank">helldivers.wiki.gg</a>
          </td>
          <td class="credit-reason">Helldivers related SVG pictures</td>
        </tr>
        <tr>
          <td class="credit-target">
            <a href="https://youtu.be/yQ9_KkOuM1U" target="_blank">gamephreak5</a>
          </td>
          <td class="credit-reason">8-bit version of Liber-Tea</td>
        </tr>
        <tr>
          <td class="credit-target">
            <a
              href="https://gist.github.com/nvigneux/ad636966e36277fe6cb98ad8afff1fcc"
              target="_blank"
              >nvigneux</a
            >
          </td>
          <td class="credit-reason">.js const stratagem data</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.credits-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  color: #ffffff;
  font-family: 'Courier New', Courier, monospace;
}

h2 {
  color: #ffc72c;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
}

.credits-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.credits-table td {
  padding: 12px 10px;
  border-bottom: 2px dotted #444;
  font-size: 1.05rem;
}

.credit-target {
  text-align: left;
  width: 40%;
}

.credit-target a {
  color: #ffc72c;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 1px;
}

.credit-target a:hover {
  text-decoration: underline;
}

.credit-reason {
  text-align: right;
  width: 60%;
}
</style>
