/**
 * Import React Package.
 * @param useState With The Help Of This Hook We Can Create States In Funtional Component.
 */
import React, { useState } from "react"

/**
 * Ant Design Components Import.
 */
import { Input, Button, Row, Col, message, Spin, Form } from "antd"

/**
 * FontAwsome Package Import.
 * With The Help Of This Package We can Use Different Fonts In Project.
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

/**
 * FontAwsome Icon Import
 */
import { faUniregistry } from "@fortawesome/free-brands-svg-icons"

/**
 * The Handler Is Used To Perform Various Tasks.
 * If You Need To Check What Handler Do Please Check Handler Folder
 */
import handler from "../handlers"

/**
 * This Is Main Method Of This Funtional Component.
 */
const Login = (props) => {
  // State Declaration.
  //   const [username, setUsername] = useState("")
  //   const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()

  //This Method Execute Login Authorization Process
  let onLogin = (values) => {
    try {
      console.log(values)
      setIsLoading(true)
      handler.auth
        .login({ username: values.username, password: values.password })
        .then((isLoggedIn) => {
          setIsLoading(false)
          if (isLoggedIn) window.location.reload()
          else message.error("Login falied", 5)
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <React.Fragment>
      <Spin spinning={isLoading}>
        <div className="login" style={{ margin: "8px auto" }}>
          <Form form={form} layout="vertical" onFinish={onLogin}>
            <Row gutter={[16, 16]}>
              {/* Name Of Customer */}
              <Col span={24} style={{ textAlign: "center" }}>
                <FontAwesomeIcon
                  style={{ fontSize: 64 }}
                  icon={faUniregistry}
                />
                <h4>Unnati Pollution Service Center</h4>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Username"
                  required
                  name="username"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Username"
                    // value={username}
                    // onChange={(e) =>
                    //     setUsername(e.target.value)
                    // }
                    autoFocus
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }]}
                  required
                >
                  <Input
                    placeholder="Password"
                    type="password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Button htmlType="submit">Login</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Spin>
    </React.Fragment>
  )
}

// Export The Current Component
export default Login
