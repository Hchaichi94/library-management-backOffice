export interface PropsNavbar{
    showDrawer: () => void
  }

export interface PropsSideBar {
    visibleDrawer: boolean,
    setVisibleDrawer: React.Dispatch<React.SetStateAction<boolean>>
}