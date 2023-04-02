/**
 * Import React Package.
 */
import React from "react";

/**
 * Ant Design Components Import.
 */
import { Layout } from "antd";

/**
 * Desctructuring Of Layout Component Of Ant Design.
 */
const { Content, Footer } = Layout;

/**
 * This Is Main Method Of This Funtional Component.
 */
const NonAuth = (props) => {
  return (
    <Layout>
      <Layout>
        <Layout style={{}}>
          {/* Main Body Section */}
          <Content
            style={{
              margin: "70px auto",
              padding: 8,
            }}
          >
            {props.children}
          </Content>

          {/* Footer Section */}
          <Footer
            style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              backgroundColor: "#fff",
              textAlign: "center",
            }}
          >
            Copyright &copy; 2020 by Chirag Shah.
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

// Export The Current Component
export default NonAuth;
