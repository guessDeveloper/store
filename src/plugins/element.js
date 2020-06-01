import Vue from 'vue'
import { Carousel, CarouselItem, Dropdown, DropdownItem, DropdownMenu, Pagination, Dialog, Select, Loading, MessageBox, Message } from 'element-ui'
Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Loading)
    // Vue.use(Message)
    // Vue.component(MessageBox.name, MessageBox)
Vue.prototype.$alert = MessageBox
Vue.prototype.$message = Message