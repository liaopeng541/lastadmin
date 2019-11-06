<style scoped lang="less">
    @import "../../resource/assets/styles/login.less";
</style>


<template>
    <div style="width: 100%">
        <div class="login">
            <div class="login-box">
                <div class="login-title">
                    <Icon name="log-in" :w="18" :h="18"/>
                    <span>{{this.$store.state.main.sysConfig.appName}}-管理中心</span>

                </div>
                <div class="login-body">
                    <div class="login-form">
                        <div class="login-item">
                            <el-input placeholder="请输入用户名" v-model="username" size="medium">
                                <template slot="prepend">用户名</template>
                            </el-input>
                        </div>
                        <div class="login-item">
                            <el-input placeholder="请输入用户名" v-model="password" size="medium" type="password">
                                <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
                            </el-input>
                        </div>
                        <div class="login-item">
                            <div style="flex:1">
                                <el-input placeholder="验证码" v-model="verify" size="medium" @keyup.enter.native="login">
                                    <template slot="prepend">验证码</template>

                                </el-input>
                            </div>
                            <div style="width: 120px;overflow: hidden;height: 36px;margin-left: 5px;cursor: pointer;background: #ffffff"
                                 @click="changecode" v-loading="codeimg?false:true">
                                <img v-if="codeimg" :src="codeimg" style="width: 100%;height: 100%"/>
                            </div>
                        </div>
                    </div>

                    <div class="login-btn">
                        <el-button @click="login" :loading="loading" type="primary" style="width: 100%" size="default">
                            {{loading?"登录中":"登 录"}}
                        </el-button>

                    </div>

                </div>


            </div>


        </div>
        <div id="indexLizi"></div>
    </div>
</template>

<script>
  import THREE from '@resource/libs/three/three';

  export default {
    name: "Login",
    data() {
      return {
        username: "admin",
        password: "admin1",
        verify: "",
        codeimg: "",
        loading: false,
      }
    },
    directives: {
      focus: {
        update: function (el, {value}) {
          if (value) {
            el.focus()
          }
        }
      }
    },


    mounted() {
      //    this.liziInit();
      //    this.$store.dispatch("main/loginOut")
      //  this.$store.dispatch("main/checkLogin");
      this.changecode();
    },

    methods: {
      liziInit() {
        var SCREEN_WIDTH = window.innerWidth;
        var SCREEN_HEIGHT = window.innerHeight;

        var SEPARATION = 90;
        var AMOUNTX = 50;
        var AMOUNTY = 50;

        var container;

        var particles, particle;
        var count;

        var camera;
        var scene;
        var renderer;

        var mouseX = 0;
        var mouseY = 0;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        init();
        this.interval = setInterval(loop, 1000 / 60);

        function init() {

          container = document.createElement('div');
          container.style.position = 'relative';
          container.style.top = '200px';
          document.getElementById('indexLizi').appendChild(container);

          camera = new THREE.Camera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
          camera.position.z = 1000;

          scene = new THREE.Scene();

          renderer = new THREE.CanvasRenderer();
          renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

          particles = new Array();

          var i = 0;
          var material = new THREE.ParticleCircleMaterial(0x097bdb, 1);

          for (var ix = 0; ix < AMOUNTX; ix++) {

            for (var iy = 0; iy < AMOUNTY; iy++) {

              particle = particles[i++] = new THREE.Particle(material);
              particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
              particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
              scene.add(particle);
            }
          }

          count = 0;

          container.appendChild(renderer.domElement);

          document.addEventListener('mousemove', onDocumentMouseMove, false);
//                    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
        }

        function onDocumentMouseMove(event) {

          mouseX = event.clientX - windowHalfX;
          mouseY = event.clientY - windowHalfY;

        }

        function onDocumentTouchMove(event) {

          if (event.touches.length == 1) {

            event.preventDefault();

            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;

          }
        }

        function loop() {
          camera.position.x += (mouseX - camera.position.x) * .05;
//                    camera.position.y += ( - mouseY - camera.position.y ) * .05;
          camera.position.y = 364;

          var i = 0;

          for (var ix = 0; ix < AMOUNTX; ix++) {

            for (var iy = 0; iy < AMOUNTY; iy++) {

              particle = particles[i++];
              particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
              particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;

            }
          }

          renderer.render(scene, camera);

          count += 0.1;
        }
      },
      login() {

        if (!this.username) {
          this.$message.error('请填写用户名');
          return false;
        }
        if (!this.password) {
          this.$message.error('请填写密码');
          return false;
        }
        if (!this.verify) {
          this.$message.error('请填写验证码');
          return false;
        }
        this.loading = true
        this.$http().showSpin(true).post(this.$Api.login, this.$data, (response) => {
          this.loading = true
          if (response.status == 100) {
            this.$store.commit("main/setMainData", response.data)
            this.$router.push("/")
          } else {
            this.changecode();
            this.$message.error(response.message);

          }

        }, null, () => {
          this.loading = false
        }, true, true, true)
      },
      changecode() {
        this.codeimg = "";
        this.$http().showSpin(false).get(this.$Api.captcha + "&refresh=1", null, (response) => {
          this.codeimg = this.$Api.domain + response.data.url + '&token=' + this.$store.state.main.token;
        })

      },

    },

    beforeDestroy() {
      if (this.interval) clearInterval(this.interval);
    }
  }
</script>
