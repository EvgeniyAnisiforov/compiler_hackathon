import React, { useCallback } from "react"
import type { MenuProps } from "antd"
import { Dropdown, message, Space } from "antd"
import style from "./MenuColorIcon.module.css"
import icon from "../assets/img/iconColor.svg"
import { useAppDispatch } from "../hook/hookRTK"
import { setColor } from "../store/colorSelector-slice"

const MenuColorIcon: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleClick = useCallback(
    ({ key }:{key:string}) => {
      message.info(`У вас прекрасный вкус!`)
      dispatch(setColor(key))
    },
    [dispatch]
  )

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          className={`${style["MenuColorIcon__container"]} ${style["MenuColorIcon__color1"]}`}
        ></div>
      ),
      key: "#4e54c8",
    },
    {
      label: (
        <div
          className={`${style["MenuColorIcon__container"]} ${style["MenuColorIcon__color2"]}`}
        ></div>
      ),
      key: "#f4a261",
    },
    {
      label: (
        <div
          className={`${style["MenuColorIcon__container"]} ${style["MenuColorIcon__color3"]}`}
        ></div>
      ),
      key: "#fb6f92",
    },
    {
      label: (
        <div
          className={`${style["MenuColorIcon__container"]} ${style["MenuColorIcon__color4"]}`}
        ></div>
      ),
      key: "#00b4d8",
    },
    {
      label: (
        <div
          className={`${style["MenuColorIcon__container"]} ${style["MenuColorIcon__color5"]}`}
        ></div>
      ),
      key: "#003f88",
    },
    {
      label: (
        <div
          className={`${style["MenuColorIcon__container"]} ${style["MenuColorIcon__color6"]}`}
        ></div>
      ),
      key: "#588157",
    },
    {
      label: (
        <div
          className={`${style["MenuColorIcon__container"]} ${style["MenuColorIcon__color7"]}`}
        ></div>
      ),
      key: "#e5383b",
    },
  ]

  return (
    <Dropdown menu={{ items, onClick: handleClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <div className={style["MenuColorIcon__iconColor"]}>
            <img src={icon} alt="Color Picker Icon" />
          </div>
        </Space>
      </a>
    </Dropdown>
  )
}

export default MenuColorIcon
