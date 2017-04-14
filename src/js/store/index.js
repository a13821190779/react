import { createStore } from 'redux'
import reducer from "./reducer.js";
import { increaseAction, changeName } from "./actions.js";//引入actions



import devToolsEnhancer from 'remote-redux-devtools';


//这句话是用来开启谷歌浏览器查看store的
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());//初始化


function mapStateToProps(state) {//遍历state到组件的props
    return {
        value: state.count,
        name: state.name
    }
}

function mapDispatchToProps(dispatch) {//遍历dispatch到组件的props，以让组件调用
    return {
        add: () => dispatch(increaseAction),
        cn: () => dispatch(changeName)
    }
}

export default {
    store, mapStateToProps, mapDispatchToProps
}