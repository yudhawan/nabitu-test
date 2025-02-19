export type Theme = "dark"|"light"

export type AppMainContextType={
    theme:Theme
    sidebar_weight:number,
    set_sidebar_weight:(val:number)=>void
    header_height:number,
    set_header_height:(val:number)=>void
    screen_window: number
    set_screen_window: (val:number)=>void
    toogle_theme:(val:Theme)=>void
}