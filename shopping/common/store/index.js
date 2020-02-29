import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



const store = new Vuex.Store({
	state: {
		settArr:[],
		defaAdd:{},
		totalPri:0
	},
	mutations: {
		SET_SETARR: (state, settArr) => {
			state.settArr = settArr
		},
		SET_DEFAADD:(state,defaAdd) => {
			state.defaAdd = defaAdd
		},
		SET_PRICE:(state,totalPri) =>{
			state.totalPri = totalPri
		}
	},
})

export default store