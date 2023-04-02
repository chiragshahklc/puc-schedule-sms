/**
 * Import React Package.
 */
import React from "react";

/**
 * This Library is used to Format The Selected Date's In Component
 */
import moment from "moment";

/**
 * Custom Component Import
 * Axios Instance Is Import So We Can Re-use In API's Calling Section.
 */
import axios from "../handlers/axios-handler";

/**
 * Ant Design Components Import.
 */
import {
  Row,
  Col,
  Input,
  Card,
  Button,
  DatePicker,
  Table,
  Modal,
  Alert,
  notification,
  Spin,
  message
} from "antd";


/**
 * Destructuring OF Modal Component of Ant-Design
 */
const { confirm } = Modal;

class Home extends React.Component {

  // Constructure Which is used to Initialize States.
  constructor(props) {
    super(props);
    this.state = {
      msgDate: moment(),
      msgCredit: 0,
      tableCols: [
        {
          title: "Contact No",
          dataIndex: "contact"
        },
        {
          title: "Vehicle No",
          dataIndex: "vehicle"
        },
        {
          title: "Date",
          dataIndex: "date",
          render: date => moment(date).format("DD MMM YYYY")
        }
      ],
      tableSource: [],
      contacts: "",
      vehicles: "",
      errors: "",
      isLoading: true
    };
  }


  /**
   * This is React Life Cycle Method
   * This Method Execute availableMsgs Method
   */
  componentDidMount() {
    try {
      availableMsgs().then(credit =>
        this.setState({ msgCredit: credit, isLoading: false })
      );
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Something is wrong",
        description: "Please check error log"
      });
    }
  }

  /**
   * This Method Shows Confirm Messages
   */
  showConfirm = () => {
    try {
      if (!this.state.tableSource.length) {
        this.setState({
          errors: "Please add contact no and vehicle no to send SMS."
        });
      } else if (!this.state.msgDate) {
        this.setState({
          errors: "Please select date before sending SMS."
        });
      } else {
        confirm({
          title: "Are u sure you want to send?",
          content: "Click OK to send SMS",
          onOk: () => {
            this.sendTransactionMsg();
          },
          onCancel: () => {
            console.log("No");
          }
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Something is wrong",
        description: "Please check error log"
      });
    }
  };

  // This Method Is Used To Set Nessage Date 
  setMsgDate = date => {
    try {
      this.setState({ msgDate: date });
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Something is wrong",
        description: "Please check error log"
      });
    }
  };

  // This Method Is Used To Fetch All Data
  onFetchClick = () => {
    try {
      const { vehicles, contacts, msgDate } = this.state;
      let arrContacts = contacts ? contacts.split("\n") : [];
      let arrVehicles = vehicles ? vehicles.split("\n") : [];
      let arrDataSource = [];
      arrDataSource = arrContacts.map((contact, i) => ({
        ind: i,
        contact,
        vehicle: arrVehicles[i],
        date: msgDate
      }));
      this.setState({ tableSource: arrDataSource, errors: "" });
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Something is wrong",
        description: "Please check error log"
      });
    }
  };

  // This Method Is Used To Send Messages
  sendTransactionMsg = async () => {
    try {
      const { tableSource } = this.state;
      this.setState({ isLoading: true });
      await axios
        // .post("/untpuc/send-msg", tableSource)
        .post("/send-msg", tableSource)
        .catch(err => {
          console.error(err);
          notification.error({
            message: "Something is wrong",
            description: "Please check error log"
          });
        });
      let credits = await availableMsgs();
      message.success("SMS Sent Successfully");
      this.setState({ msgCredit: credits, isLoading: false });
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Something is wrong",
        description: "Please check error log"
      });
    }
  };
  render() {

    // Desctructuring Of State
    const {
      tableSource,
      isLoading,
      msgCredit,
      msgDate,
      tableCols
    } = this.state;
    return (
      <React.Fragment>
        <Spin spinning={isLoading} size="large">
          <div className="home" style={{}}>
            <Card>
              <Row gutter={[16, 16]}>
                {!!this.state.errors ? (
                  <Col>
                    <Alert
                      type="error"
                      message={this.state.errors}
                      closable
                    ></Alert>
                  </Col>
                ) : null}
                <Col>
                  Available Messages: <strong>{msgCredit}</strong>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24} lg={16}>
                  <Table
                    columns={tableCols}
                    dataSource={tableSource}
                    rowKey={record => `row-${record.ind}`}
                    bordered
                    size="small"
                  ></Table>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24} lg={16}>
                  <Row gutter={[16, 16]}>
                    <Col span={24} lg={12}>
                      <label>Contact numbers:</label>
                      <Input.TextArea
                        placeholder="Contact numbers"
                        onChange={e =>
                          this.setState({ contacts: e.target.value })
                        }
                        onBlur={() => {
                          this.setState((state, prop) => ({
                            contacts: state.contacts.trim()
                          }));
                        }}
                        value={this.state.contacts}
                      ></Input.TextArea>
                    </Col>
                    <Col span={24} lg={12}>
                      <label>Vehicle numbers:</label>
                      <Input.TextArea
                        placeholder="Vehicle numbers"
                        onChange={e =>
                          this.setState({ vehicles: e.target.value })
                        }
                        onBlur={() => {
                          this.setState((state, prop) => ({
                            vehicles: state.vehicles.trim()
                          }));
                        }}
                        value={this.state.vehicles}
                      ></Input.TextArea>
                    </Col>
                    <Col span={24}>
                      <label>Expiry Date:</label>
                      <br />
                      <DatePicker
                        onChange={(date, ds) => {
                          this.setState({ errors: "" });
                          this.setMsgDate(date);
                        }}
                        value={msgDate}
                      ></DatePicker>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        name="fetch-contacts"
                        onClick={this.onFetchClick}
                      >
                        Fetch
                      </Button>
                    </Col>
                    <Col>
                      {tableSource.length ? (
                        <Button
                          size="default"
                          type="primary"
                          onClick={this.showConfirm}
                        >
                          Send
                        </Button>
                      ) : null}
                    </Col>
                    <Col>
                      <p>
                        <strong>Sample Message</strong>
                      </p>
                      <code>
                        {formatMsg(this.state.msgDate, "GJ 01 AA 1111")}
                      </code>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </div>
        </Spin>
      </React.Fragment>
    );
  }
}

// This Method Is Used To Format The Message Body
const formatMsg = (date, vehicleNo) => {
  try {
    return `Your PUC expire on ${moment(date).format(
      "DD MMM YYYY"
    )}. Your PUC vehicle no is ${vehicleNo}. Please renew your vehicle PUC before due date. From - Unnati Pollution Center, Bardoli`;
  } catch (error) {
    console.error(error);
    notification.error({
      message: "Something is wrong",
      description: "Please check error log"
    });
  }
};


// This Method Is Used To Calculate Available Messages
const availableMsgs = async () => {
  try {
    let result = await axios
      .get("/check-balance")
      // .get("/untpuc/check-balance")
      .catch(err => console.error(err));
    return result ? result.data.data.credits : null;
  } catch (error) {
    console.error(error);
    notification.error({
      message: "Something is wrong",
      description: "Please check error log"
    });
  }
};

// Export The Current Component
export default Home;
