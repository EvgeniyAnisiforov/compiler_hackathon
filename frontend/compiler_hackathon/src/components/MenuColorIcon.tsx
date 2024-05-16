import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import style from "./MenuColorIcon.module.css"
import icon from "../assets/img/iconColor.svg"

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const items: MenuProps['items'] = [
  {
    label: <div className={`${style["MenuColorIcon__container"]} ${style["MenuColorIcon__color1"]}`}></div>,
    key: '1',
  },
  {
    label: <div className={`${style["MenuColorIcon__container"]} ${style["MenuColorIcon__color2"]}`}></div>,
    key: '2',
  },
  {
    label: <div className={`${style["MenuColorIcon__container"]} ${style["MenuColorIcon__color3"]}`}></div>,
    key: '3',
  },
];

const MenuColorIcon: React.FC = () => (
  <Dropdown menu={{ items, onClick }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <div className={style["MenuColorIcon__iconColor"]}>
          <img src={icon}/>
        </div>
      </Space>
    </a>
  </Dropdown>
);

export default MenuColorIcon;