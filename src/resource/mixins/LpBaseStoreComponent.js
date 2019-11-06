export default {
  beforeCreate()
  {
    var comopentName=this.$options.name.substring(0,this.$options.name.indexOf('_component'));
    this.storeData=lp.$util.getobjforpath(this.$store.state,comopentName)
    this.storePath=comopentName.replace('_','/')+'/';
  },
  created() {


  },
  mounted() {

  },
  data: function () {
    return{}
  },
  methods: {



  }


}
