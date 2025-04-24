<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

const modules = ['Autoplay']
</script>
<template>
  <main>
    <hero class="hero">
      <div class="container">
        <div class="hero__wrap">
          <div class="hero__content">
            <h1 class="hero__content-title">choose the best</h1>
            <div class="hero__content-text">
              <p>Vote for the best, reward for the best</p>
            </div>
            <button class="hero__content-button">
              <router-link to="/vote" class="hero__content-button-link"> Vote Now </router-link>
            </button>
          </div>
          <Swiper
            :modules="[Autoplay, Pagination, Navigation]"
            :slides-per-view="1"
            :loop="true"
            :autoplay="{ delay: 2500, disableOnInteraction: false }"
            pagination
            navigation
            class="mySwiper"
          >
            <SwiperSlide>
              <div class="slide-content">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, accusamus.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="slide-content">Slide 2</div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="slide-content">Slide 3</div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </hero>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
}
.hero {
  width: 100%;
  height: 500px;
  display: flex;
  background: url('/public/hero/hero-bg.svg') no-repeat -100px 0 / cover;
}

.hero__wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.hero__content {
  padding: 120px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}

.hero__content-title {
  font-size: 2.5rem;
  text-transform: uppercase;
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-weight: 700;
}

.hero__content-text {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  gap: 10px;
}

.hero__content-text p {
  font-family: 'Special Gothic Expanded One', sans-serif;
  text-transform: capitalize;
}

.hero__content-button {
  margin-top: 20px;
  background: #000000;
  border-radius: 5px;

  width: 150px;
  height: 40px;
  color: #ffffff;
  transition: 0.2s;
  border: none;
}

.hero__content-button-link {
  padding: 13px 45px;
  color: #ffffff;
  font-weight: 600;
}

.hero__content-button:hover {
  background: #00000080;
}

.slide-content {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ddd;
  font-size: 24px;
  border-radius: 12px;
  z-index: 10;
}
</style>
