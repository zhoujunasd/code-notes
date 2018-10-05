<template>
    <div>
        <label class="chexk_com">
            <input type="checkbox" class="dis_no" v-model="currentValue" >
            <span class="box-warp"></span>
        </label>
    </div>
</template>

<script>
// import checkbox from '@/components/CheckBox'
// checkbox,
// <checkbox v-model="checkbox"></checkbox>
export default {
  props: {
    // 父组件传值的验证，可以是数组，对象，以及一个自定义验证方法
    // 可以设置检查属性，如required：必须，default：默认值
    // prop验证，String,Number,Boolean,Array,Object,Date,Function(函数),Symbol
    // type 还可以是一个自定义的构造函数，并且通过 instanceof 来进行检查确认
    // propF: {
    //   validator: function (value) {// 这个值必须匹配下列字符串中的一个
    //     return ['success', 'warning', 'danger'].indexOf(value) !== -1
    //   }
    // }
    value: {
      type: [String, Number, Boolean]
    }
  },
  data() {
    return {
      currentValue: ""
    };
  },
  watch: {
    currentValue(val) {
      // v-model绑定的数据，在组件内，需要设置value值以及this.$emit("input", val);进行双向绑定
      // 以及设置value的监听函数，进行赋值
      this.$emit("input", val);
      this.$emit("change", val);
    },
    value() {
      this.currentValue = this.value;
    }
  }
};
</script>

<style scoped lang='scss'>
.chexk_com {
  width: 16px;
  height: 16px;
  display: inline-block;
  border: 1px solid #e8e8e8;
  border-radius: 4px;

  .box-warp {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    transform: scale(0);
  }

  .dis_no:checked + .box-warp {
    background-color: #409eff;
    transform: scale(1);
    transition: transform 0.2s ease;
  }

  .dis_no:checked + .box-warp::after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: -10%;
    width: 0;
    height: 0;
    // 通过设置四条border边，形成一个对号
    border-top: 4px solid transparent;
    border-right: 16px solid transparent;
    border-bottom: 3px solid #fff;
    border-left: 3px solid #fff;
    transform: rotate(-45deg) translate(-50%, -50%);
  }

  .dis_no {
    display: none;
  }
}
</style>