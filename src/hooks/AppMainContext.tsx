import { AppMainContextType, Theme } from "@/libs/types/AppMainContextType";
import { createContext, ReactNode, useState } from "react";



export const AppMainContext = createContext<AppMainContextType|null>(null)
type StateType = Omit<AppMainContextType,"set_header_height" | "set_screen_window"|"toogle_theme"|"set_sidebar_weight">
function AppMainProvider({children}:{children:ReactNode}) {
    const [state,setState]=useState<StateType>({
        theme:"light",
        sidebar_weight:280,
        header_height:80,
        screen_window:0,
    })
    function set_header_height(params:number) {
        setState(a=>({...a,header_height:params}))
    }
    function set_screen_window(params:number) {
        setState(a=>({...a,screen_window:params}))
    }
    function toogle_theme(params:Theme) {
        setState(a=>({...a,theme:params}))
    }
    function set_sidebar_weight(params:number) {
        setState(a=>({...a,sidebar_weight:params}))
    }
    return (
        <AppMainContext.Provider value={{
            theme:state.theme,
            sidebar_weight:state.sidebar_weight,
            header_height:state.header_height,
            screen_window:state.screen_window,
            set_header_height,
            set_screen_window,
            toogle_theme,
            set_sidebar_weight
        }} >
            {children}
        </AppMainContext.Provider>
    )
}

export default AppMainProvider
