<template>
    <Tree showLine
    >
    <TreeNode title="parent 1" key="0-0">
        <TreeNode title="parent 1-0" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" />
            <TreeNode title="leaf" key="0-0-0-1" />
            <TreeNode title="leaf" key="0-0-0-2" />
        </TreeNode>
        <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title="leaf" key="0-0-1-0" />
        </TreeNode>
        <TreeNode title="parent 1-2" key="0-0-2">
            <TreeNode title="leaf" key="0-0-2-0" />
            <TreeNode title="leaf" key="0-0-2-1" />
        </TreeNode>
    </TreeNode>
    </Tree>
</template>

<script>


  import { Tree} from 'ant-design-vue';
  const { TreeNode } = Tree;


  export default {
    name: "AdminMenuTree",
    components:{Tree,TreeNode},
    mounted(){
      console.log(this.$parent)
    },
    methods: {
    }
  }
</script>

<style scoped>
    @import "~@resource/assets/styles/antd.less";
</style>