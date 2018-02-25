<template>
    <header :class="classWithNS('header-root')">
        <div :class="classWithNS('header-group__prepend')" v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </div>
        <div :class="classWithNS('header-group__main')">
            <slot :text="title">
                <div :class="classWithNS('header__title')" v-text="title"></div>
            </slot>
        </div>
        <div :class="classWithNS('header-group__append')" v-if="$slots.append">
            <slot name="append"></slot>
        </div>
    </header>
</template>
<script>
import utils from "../sr-utils";

export default {
  name: "SrHeader",
  props: {
    title: String,
    classNamespace: {
      type: String,
      default: "sr"
    },
    classSubfix: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },

  methods: {
    classWithNS(baseClassName) {
      return utils.getFullClassName(
        baseClassName,
        this.classNamespace,
        this.classSubfix
      );
    }
  }
};
</script>
<style>
.sr-header-root {
  display: flex;
  height: 40px;
  line-height: 40px;
  background: #fff;
  color: #f00;
}

.sr-header-group__prepend {
  flex: none;
}

.sr-header-group__main {
  flex: 1 0 0;
}

.sr-header__title {
  text-align: center;
}

.sr-header-group__append {
  flex: none;
}
</style>
