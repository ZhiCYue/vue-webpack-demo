<template>

	<transition name="mea-fade">
		<div class="mea-toast" v-if="show" :style="style">
			<div class="mea-toast-message">
				{{content}}
			</div>
		</div>
	</transition>

</template>


<script>
    import pageChange from '../../mixins'
	export default {
        mixins: [pageChange],
		data () {
			return {
				show: false,
				content: '',
				duration: 1500,
				style: {}
			}
		}
	}
</script>


<style scoped>


    /* mea-toast */
    .mea-toast {
        position: fixed;
        z-index: 9999;
        line-height: 17px;
        left: 50%;
        transform: translate(-50%, 0);
        bottom: 50px;
    }
    .mea-toast-message {
        font-size: 14px;
        padding: 12px 16px;
        text-align: center;
        color: #fff;
        border-radius: 6px;
        background: #323232;
        opacity: .9;
    }

	.mea-fade-enter {
	  opacity: 0
	}
	.mea-fade-enter-active, .mea-fade-leave-active {
	  transition: opacity .4s
	}
	.mea-fade-leave-active {
		opacity: 0;
	}

</style>