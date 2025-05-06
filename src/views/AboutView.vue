<script setup>
import GuitarIcon from '@/components/UI/GuitarIcon.vue'
</script>

<template>
  <div class="wrap">
    <div class="about">
      <div class="container">
        <div class="about__row">
          <div class="about__img">
            <img src="/about-bg.png" alt="" class="about__img-img" />
          </div>
          <div class="about__block">
            <h1 class="about__block-title">About the Project</h1>
            <div class="about__block-text">
              <p>
                This site was created for everyone who loves music and wants to help decide which
                songs and albums truly deserve the spotlight.
              </p>
              <p>
                We believe that listeners’ voices matter more than any chart or award committee.
                Here, every vote shapes the final rankings.
              </p>
            </div>
            <ul class="about__block-list">
              <li class="about__block-item">
                <h3 class="about__list-title">What We Do:</h3>
                <p class="about__list-text">
                  <GuitarIcon color="#1100ff" />
                  <span>
                    We collect the best music releases, let users vote, and create monthly and
                    yearly top lists.
                  </span>
                </p>
              </li>
              <li class="about__block-item">
                <h3 class="about__list-title">How It Works:</h3>
                <p class="about__list-text">
                  <GuitarIcon color="#ffabb9" />
                  <span>
                    Every registered user can vote daily for their favorite songs and albums. The
                    results update in real time, so you always see the latest rankings.
                  </span>
                </p>
              </li>
              <li class="about__block-item">
                <h3 class="about__list-title">What We Do:</h3>
                <p class="about__list-text">
                  <GuitarIcon color="#000" />
                  <span>
                    We collect the best music releases, let users vote, and create monthly and
                    yearly top lists.
                  </span>
                </p>
                <p class="last-text">
                  Join us, cast your vote, and help create an honest and dynamic music ranking!
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.wrap {
  height: 100%;
  min-height: 100vh;
  align-content: center;
  justify-items: center;
}

.about {
  margin: 30px 0;
  min-height: 100%;
  align-content: center;
}

.about__row {
  display: flex;
  justify-content: space-evenly;
  gap: 30px;
}

.about__img {
  width: 100%;
  text-align: center;
  img {
    max-width: 400px;
    width: 100%;
  }
}

.about__block {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.about__block-text {
  text-align: justify;
  p {
    margin: 10px 0;
  }
}

.about__block-title {
  font-size: 36px;
  font-family: var(--second-font);
  font-weight: 600;
}

.about__block-list {
  margin: 10px 0;
}

.about__list-title {
  font-weight: 600;
}

.about__list-text {
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  span {
    width: 100%;
    display: block;
  }
}

.last-text {
  margin: 10px 0;
}

@media (max-width: 768px) {
  .about__row {
    flex-direction: column;
  }
}
</style>
