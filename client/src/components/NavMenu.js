/**
 * Import React Package.
 */
import React from "react";

/**
 * Ant Design Components Import.
 */
import { Menu } from "antd";

/**
 * React Router Packages Import.
 * @param Link This Funtion Is Similar Link Anchor Tag In HTML. You Can Say This Is React-Router's Anchor Tag.
 *             Page Will Not Re-Render When User Click On It.
 * @param useLocation This Hook Returns The Location Object That Represents The Current URL. 
 *             You Can Think About Tt Like A UseState That Returns A New Location Whenever The URL Changes.
 */
import { Link, useLocation } from "react-router-dom";

/**
 * This Is Main Method Of This Funtional Component.
 */
const NavMenu = props => {

  // Creating Object Of useLocation(). 
  let location = useLocation();

  return (
    <React.Fragment>
      <Menu
        theme="dark"
        mode="inline"
        style={{ lineHeight: "64px" }}
        selectedKeys={[location.pathname]}
      >
        {/* Send Message Link */}
        <Menu.Item key="/">
          <Link to="/">Send Message</Link>
        </Menu.Item>

        {/* Schedule Message Link */}
        <Menu.Item key="/schedule-msg">
          <Link to="/schedule-msg">Schedule Message</Link>
        </Menu.Item>
        {/* <Menu.Item key="/customers">
          <Link to="/customers">Customers</Link>
        </Menu.Item> */}
      </Menu>
    </React.Fragment>
  );
};

// Export The Current Component
export default NavMenu;
