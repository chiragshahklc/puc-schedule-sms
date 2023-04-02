/**
 * Import React Package.
 * @param useState With The Help Of This Hook We Can Create States In Funtional Component.
 */
import React, { useState } from "react";

/**
 * React Router Packages Import.
 * @param userHistory This Hook Gives You Access To The History Instance That You May Use To Navigate.
 */
import { useHistory } from "react-router-dom";

/**
 * Ant Design Components Import.
 */
import { Layout, Button, Row, Col } from "antd";

/**
 * FontAwsome Package Import.
 * With The Help Of This Package We can Use Different Fonts In Project.
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * FontAwsome Icon Import
 */
import { faUniregistry } from "@fortawesome/free-brands-svg-icons";

/**
 * Component Specific SCSS File Import.
 * Custom Styling Is Store In This File.
 */
import style from "./Auth.module.scss";

/**
 * Custom Component Import.
 * This Component Provide Navigation Support So User Can Travers In Different Sections Of Applicaitons
 */
import NavMenu from "../components/NavMenu";

/**
 * Desctructuring Of Layout Component Of Ant Design.
 */
const { Header, Content, Footer, Sider } = Layout;

/**
 * This Is Main Method Of This Funtional Component.
 */
const Auth = (props) => {
  // State Declaration.
  const [islgOrSmaller, setIslgOrSmaller] = useState(true);

  // Creating Object Of useHistory().
  let history = useHistory();

  // Logout Funtion.
  let onLogoutClick = (e) => {
    try {
      e.preventDefault();
      history.push("/logout");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout className={`${style.layout} ${islgOrSmaller ? null : style.fixed}`}>
      {/* Main Slider Section */}
      <Sider
        className={`${style.slider}`}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setIslgOrSmaller(broken);
        }}
      >
        {/* Logo Section */}
        <div className={`${style.logo}`}>
          <FontAwesomeIcon style={{ fontSize: 48 }} icon={faUniregistry} />
          <h6 style={{ color: "#fff" }}>Unnati Pollution Service Center</h6>
        </div>

        {/* Navigation Section Component */}
        <NavMenu />
      </Sider>

      <Layout className={`${style.layout}`}>
        {/* Name Of The Client On Header And Logout Button */}
        <Header className={`${style.header}`}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <label className={`${style.title}`}>
                Unnati Pollution Service Center
              </label>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Button onClick={onLogoutClick}>Logout</Button>
            </Col>
          </Row>
        </Header>

        {/* Main Body Section */}
        <Content className={`${style.content}`}>{props.children}</Content>

        {/* Footer Section */}
        <Footer className={`${style.footer}`}>
          Copyright &copy; 2020 by Chirag Shah.
        </Footer>
      </Layout>
    </Layout>
  );
};

// Export The Current Component
export default Auth;
