import {
  filterHighLevel,
  filterImpressive,
  FILTER_LUCKY_NUMBER,
  filterPrice,
  filterTel,
} from "../../constants/config";
import {
  Button,
  CellTowerIcon,
  CrossIcon,
  DollarIcon,
  InheritedGroupIcon,
  KeyCommandIcon,
  Link,
  Pane,
  Popover,
  SettingsIcon,
  Tab,
  Tablist,
} from "evergreen-ui";
import React from "react";
import { renderLogo, renderLogoTelUrl } from "../../constants/shared";
import Modal from "../helpers/Modal";

const MenuPopover = () => {
  const [isShown, setIsShown] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabs] = React.useState([
    {
      label: "Theo mạng",
      title: "Mạng di động",
      type: "tel",
      icon: <CellTowerIcon size={25} color="#195eab" />,
    },
    {
      label: "Sim theo loại",
      title: "Sim theo loại",
      type: "classify",
      icon: <SettingsIcon size={25} color="#195eab" />,
    },
    {
      label: "Sim theo giá",
      title: "Sim theo khoảng giá",
      type: "price",
      icon: <DollarIcon size={25} color="#195eab" />,
    },
    {
      label: "Thu mua sim",
      title: "Mua / bán, cầm cố sim",
      type: "transaction",
      icon: <InheritedGroupIcon size={25} color="#195eab" />,
    },
  ]);

  const toggleShown = () => {
    setIsShown(!isShown);
  };

  return (
    <div>
      {/* <Popover
        bringFocusInside
        position="top"
        trigger="click"
        isShown={isShown}
        content={
          <div className="w-screen h-screen m-auto">
            <div className="flex justify-end mb-2">
              <Button onClick={toggleShown}>
                <CrossIcon /> Đóng
              </Button>
            </div>
            <hr />
            <div className="mt-3">
              <a
                href="/sim-phong-thuy"
                className="px-5 py-2 mx-2 rounded-sm bg-blue-400 text-xs text-white"
              >
                SIM PHONG THỦY
              </a>
              <a
                href="/sim-tra-gop"
                className="px-5 py-2 mx-2 rounded-sm bg-blue-400 text-xs text-white"
              >
                SIM TRẢ GÓP
              </a>
              <a
                href="/dinh-gia-sim"
                className="px-5 py-2 mx-2 rounded-sm bg-blue-400 text-xs text-white"
              >
                ĐỊNH GIÁ SIM
              </a>
            </div>
            <div className="mt-5 flex ml-3">
              <Tablist display="flex" flexDirection="column">
                {tabs.map((tab, index) => (
                  <Tab
                    aria-controls={`panel-${tab.label}`}
                    isSelected={index === selectedIndex}
                    key={tab.label}
                    onSelect={() => setSelectedIndex(index)}
                    width={95}
                    height={66}
                    backgroundColor={
                      index === selectedIndex ? "#ffffff" : "#dbeeff"
                    }
                    borderTop="2px solid #fff"
                    borderLeft={
                      index === selectedIndex ? "2px solid #0e56d9" : ""
                    }
                    borderRadius="0px"
                  >
                    <div className="w-full flex flex-col items-center">
                      <div>{tab.icon}</div>
                      <Pane fontSize="10px">{tab.label}</Pane>
                    </div>
                  </Tab>
                ))}
              </Tablist>
              <div className="px-1">
                {tabs.map((tab, index) => (
                  <Pane
                    aria-labelledby={tab.label}
                    aria-hidden={index !== selectedIndex}
                    display={index === selectedIndex ? "block" : "none"}
                    key={tab.label}
                    role="tabpanel"
                  >
                    <Pane
                      textTransform="uppercase"
                      fontSize="15px"
                      lineHeight="20px"
                      fontWeight={700}
                      color="#008fe5"
                      marginBottom={10}
                    >
                      {tab.title}
                    </Pane>
                    {tab.type === "tel" && (
                      <div className="w-full">
                        {filterTel.map((item: any) => (
                          <a
                            key={item.id}
                            href={item.link}
                            className="border rounded-lg md:px-3 py-1 md:mr-4 my-2 bg-white cursor-pointer flex flex-row justify-center items-center md:h-14 mobile-logo-icon float-left"
                          >
                            {renderLogo(item.telco)}
                          </a>
                        ))}
                      </div>
                    )}
                    {tab.type === "classify" && (
                      <div className="w-full">
                        {[...filterHighLevel,...filterImpressive,...FILTER_LUCKY_NUMBER].map((item: any) => (
                          <div key={item.id} className="p-1 float-left w-1/2">
                            <a
                              href={item.link}
                              className="mobile-button-filter-price"
                            >
                              {item?.label}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                    {tab.type === "price" && (
                      <div className="w-full">
                        {filterPrice.map((item: any) => (
                          <div key={item.id} className="p-1 float-left w-1/2">
                            <a
                              href={item.link}
                              className="mobile-button-filter-price"
                            >
                              {item?.label}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                    {tab.type === "transaction" && (
                      <div>
                        Bạn có nhu cầu cầm cố / bán Sim?
                        <div className="mobile-menu-contact">
                          Vui lòng liên hệ <span>02466.888.333</span>
                        </div>
                        <div className="mt-3">
                          <a href="/dat-sim-theo-yeu-cau" className="mobile-button-dat-sim">ĐẶT SIM THEO YÊU CẦU</a>
                        </div>
                      </div>
                    )}
                  </Pane>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <div></div>
      </Popover> */}
      <Modal isShowing={isShown} hide={toggleShown}>
        <div className="w-screen h-screen m-auto">
          <hr />
          <div className="mt-3 flex justify-center">
            <a
              href="/sim-phong-thuy"
              className="px-5 py-2 mx-2 rounded-sm bg-blue-400 text-xs text-white text-center"
            >
              PHONG THỦY
            </a>
            <a
              href="/sim-tra-gop"
              className="px-5 py-2 mx-2 rounded-sm bg-blue-400 text-xs text-white text-center"
            >
              SIM TRẢ GÓP
            </a>
            <a
              href="/dinh-gia-sim"
              className="px-5 py-2 mx-2 rounded-sm bg-blue-400 text-xs text-white text-center"
            >
              ĐỊNH GIÁ SIM
            </a>
            <a
              href="/bai-viet"
              className="px-5 py-2 mx-2 rounded-sm bg-blue-400 text-xs text-white text-center"
            >
              TIN TỨC
            </a>
          </div>
          <div className="mt-5 flex ml-3">
            <Tablist display="flex" flexDirection="column">
              {tabs.map((tab, index) => (
                <Tab
                  aria-controls={`panel-${tab.label}`}
                  isSelected={index === selectedIndex}
                  key={tab.label}
                  onSelect={() => setSelectedIndex(index)}
                  width={95}
                  height={66}
                  backgroundColor={
                    index === selectedIndex ? "#ffffff" : "#dbeeff"
                  }
                  borderTop="2px solid #fff"
                  borderLeft={
                    index === selectedIndex ? "2px solid #0e56d9" : ""
                  }
                  borderRadius="0px"
                >
                  <div className="w-full flex flex-col items-center">
                    <div>{tab.icon}</div>
                    <Pane fontSize="10px" className="flex justify-center">
                      {tab.label}
                    </Pane>
                  </div>
                </Tab>
              ))}
            </Tablist>
            <div className="px-1">
              {tabs.map((tab, index) => (
                <Pane
                  aria-labelledby={tab.label}
                  aria-hidden={index !== selectedIndex}
                  display={index === selectedIndex ? "block" : "none"}
                  key={tab.label}
                  role="tabpanel"
                >
                  <Pane
                    textTransform="uppercase"
                    fontSize="15px"
                    lineHeight="20px"
                    fontWeight={700}
                    color="#008fe5"
                    marginBottom={10}
                  >
                    {tab.title}
                  </Pane>
                  {tab.type === "tel" && (
                    <div className="w-full">
                      {filterTel.map((item: any) => (
                        <a
                          key={item.id}
                          href={item.link}
                          className="border rounded-lg my-2 bg-white cursor-pointer flex flex-row justify-center items-center mobile-logo-icon float-left"
                        >
                          <div
                            className="w-[50px] h-[25px]"
                            style={{
                              backgroundImage: `url(${renderLogoTelUrl(
                                item.telco
                              )})`,
                              backgroundSize:
                                item.telco === "itelecom" ? "60%" : "100%",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center center",
                            }}
                          />
                        </a>
                      ))}
                    </div>
                  )}
                  {tab.type === "classify" && (
                    <div className="w-full">
                      {[
                        ...filterHighLevel,
                        ...filterImpressive,
                        ...FILTER_LUCKY_NUMBER,
                      ].map((item: any) => (
                        <div key={item.id} className="p-1 float-left w-1/2">
                          <a
                            href={item.link}
                            className="mobile-button-filter-price"
                          >
                            {item?.label}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                  {tab.type === "price" && (
                    <div className="w-full">
                      {filterPrice.map((item: any) => (
                        <div key={item.id} className="p-1 float-left w-1/2">
                          <a
                            href={item.link}
                            className="mobile-button-filter-price"
                          >
                            {item?.label}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                  {tab.type === "transaction" && (
                    <div>
                      Bạn có nhu cầu cầm cố / bán Sim?
                      <div className="mobile-menu-contact">
                        Vui lòng liên hệ <span>02466.888.333</span>
                      </div>
                      <div className="mt-3">
                        <a
                          href="/dat-sim-theo-yeu-cau"
                          className="mobile-button-dat-sim"
                        >
                          ĐẶT SIM THEO YÊU CẦU
                        </a>
                      </div>
                    </div>
                  )}
                </Pane>
              ))}
            </div>
          </div>
        </div>
      </Modal>
      <div className="bottom-nav-link" onClick={toggleShown}>
        <KeyCommandIcon />
        <span>MENU</span>
      </div>
    </div>
  );
};

export default MenuPopover;
