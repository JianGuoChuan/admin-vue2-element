

const types = {
    HANDLE_LEFT_MENU:'HANDLE_LEFT_MENU',  // 收缩左侧菜单
    INIT_LEFT_MENU:'INIT_LEFT_MENU',     // 初始化左侧菜单
    SET_LEFT_COLLAPSE:"SET_LEFT_COLLAPSE", // 改变左边菜单的收缩宽度
    SET_FOOTER_SHOW:"SET_FOOTER_SHOW", // 显示隐藏底部layout
}
const menu = { 
    state :{
        minLeftMenuWidth:35,
        maxLeftMenuWidth:180,
        sidebar: {
            opened: true,  
            width: 180,
            bodyW: document.body.clientWidth
        },
        isCollapse:false, // 菜单默认展开
        isFooter:false
    },
    getters : {
        sidebar:state => state.sidebar,
        isCollapse:state => state.isCollapse,
        isFooter:state => state.isFooter,
    },
    mutations:{
        [types.HANDLE_LEFT_MENU] (state) {  
            if(state.sidebar.opened){//true
                state.sidebar.width = state.minLeftMenuWidth;
            }else{
                state.sidebar.width = state.maxLeftMenuWidth;
            }
           state.sidebar.opened = !state.sidebar.opened
        },
        [types.INIT_LEFT_MENU] (state) {  
            state.sidebar = state.sidebar
        },
        [types.SET_LEFT_COLLAPSE] (state) {  
            state.isCollapse = !state.isCollapse 
        },
        [types.SET_FOOTER_SHOW] (state) {  
            state.isFooter = true
        },
        SET_BODYWIDTH:(state,width)=>{
            state.sidebar.bodyW = width
        },
        SET_CLOSECOLLAPSE:(state)=>{
            state.isCollapse = true;
            state.sidebar.width = 35;
            state.sidebar.opened = false;
        }
       
    },
    actions:{
        handleLeftMenu:({ commit }) => {  
           commit(types.HANDLE_LEFT_MENU)  
        },
        initLeftMenu:({ commit }) => {  
           commit(types.INIT_LEFT_MENU)  
        },
        setLeftCollapse:({ commit}) => {  
           commit(types.SET_LEFT_COLLAPSE)  
        },
        closeCollapse:({ commit})=>{
            commit('SET_CLOSECOLLAPSE')
        }
    }
    
}


export default menu;