<template>
    <div id="main">
        <div class="store-content item">
            <div class="item-box">
                <div class="gallery-wrapper">
                    <div class="gallery">
                        <div class="thumbnail">
                            <ul>
                                <li :class="{'on':index==imgIndex}" @click="tableImg(index)" v-for="img,index in itemInfo.ali_images"><img :src="img + '?x-oss-process=image/resize,w_54/quality,Q_90/format,webp'"></li>
                            </ul>
                        </div>
                        <div class="thumb">
                            <ul>
                                <li :class="{'on':index==imgIndex}" v-for="img,index in itemInfo.ali_images"><img :src="img + '?x-oss-process=image/resize,w_440/quality,Q_90/format,webp'"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="banner">
                    <div class="sku-custom-title">
                        <div class="params-price">
                            <span><em>¥</em><i>{{itemInfo.price}}</i></span>
                        </div>
                        <div class="params-info">
                            <h4>{{itemInfo.title}}</h4>
                            <h6>{{itemInfo.sub_title}}</h6>
                        </div>
                    </div>
                    <div class="sku-dynamic-params-panel">
                        <div class="sku-dynamic-params clear">
                            <span class="params-name">颜色</span>
                            <ul class="params-colors">
                                <li :class="{'cur':color.id == $route.query.itemId}"  v-for="color,index in itemInfo.sku_list">
                                    <router-link :title="color.color" :to="{name: 'Item',query: {itemId:color.id}}">
                                        <img :src="'http://img01.smartisanos.cn/'+ color.image +'20X20.jpg'">
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="sku-dynamic-params clear">
                            <div class="params-name">数量</div>
                            <div class="params-detail clear">
                                <div class="item-num js-select-quantity">
                                    <span class="down" :class="{'down-disabled':count<=1}" @click="subCount">-</span>
                                    <span class="num">{{count}}</span>
                                    <span class="up" :class="{'up-disabled':count>=itemInfo.limit_num}" @click="addCount">+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sku-status">
                        <div class="cart-operation-wrapper clearfix">
                            <span class="blue-title-btn js-add-cart"><a @click="addCarPanelHandle">加入购物车</a></span>
                            <span class="gray-title-btn"><a>现在购买</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import itemsDate from '@/lib/newItemsData'
export default {
    data () {
        return {
            itemsDate,
            itemId: this.$route.query.itemId,
            imgIndex: 0,
            count: 1
        }
    },
    watch: {
        '$route.query.itemId' () {
            this.itemId = this.$route.query.itemId
            this.imgIndex = 0
        }
    },
    computed: {
        itemInfo () {
            let itemInfo = this.itemsDate.filter((item) => {
                return Number(item.sku_id) === this.itemId
            })[0]
            return itemInfo
        }
    },
    methods: {
        tableImg (index) {
            this.imgIndex = index
        },
        addCarPanelHandle () {
            let itemData = {info:this.itemInfo, count:this.count}
            this.$store.commit('addCarPanelData',itemData)
        },
        addCount () {
            this.count++
            if(this.count > this.itemInfo.limit_num){
                this.count = this.itemInfo.limit_num
            }
        },
        subCount () {
            this.count--
            if(this.count < 1){
                this.count = 1
            }
        }
    }
}
</script>

<style>

</style>
