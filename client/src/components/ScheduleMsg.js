/**
 * Import React Package.
 */
import React from "react"

/**
 * This Library is used to Format The Selected Date's In Component
 */
import moment from "moment"

/**
 * Ant Design Components Import.
 */
import {
  Row,
  Col,
  Card,
  message,
  DatePicker,
  Button,
  Table,
  Spin,
  Input,
} from "antd"

/**
 * The Handler Is Used To Perform Various Tasks.
 * If You Need To Check What Handler Do Please Check Handler Folder
 */
import handler from "../handlers"

/**
 * This Is Class Of This Funtional Component.
 */
class ScheduleMsg extends React.Component {
  // Constructure Which is used to Initialize States.
  constructor(props) {
    super(props)
    this.state = {
      tableCols: [
        {
          title: "Contact No",
          dataIndex: "contact",
        },
        {
          title: "Vehicle No",
          dataIndex: "vehicle",
        },
        {
          title: "Expiry Date",
          dataIndex: "date",
          render: (date) => moment(date).format("DD MMM YYYY"),
        },
        {
          title: "Created Date",
          dataIndex: "createdDate",
          render: (date) => moment(date).format("DD MMM YYYY"),
        },
      ],
      tableSource: [],
      expiryDate: null,
      isLoading: true,
      contacts: "",
      vehicles: "",
    }
  }

  // This Method Fetch All Scheduled Messages.
  fetchScheduleMsgs = async () => {
    try {
      let msgs = await handler.scheduleMsg.getScheduleMsgs()
      return msgs
    } catch (error) {
      console.error(error)
    }
  }

  // This Method Save Scheduled Message.
  onSaveClick = async () => {
    try {
      this.setState({ isLoading: true })
      let response = await handler.scheduleMsg
        .addScheduleMsg({
          bulk: true,
          expiryDate: this.state.expiryDate,
          contactNo: this.state.contacts.split("\n"),
          vehicleNo: this.state.vehicles.split("\n"),
        })
        .catch(console.error)
      if (!response) message.error("Schedule message failed", 5)
      else message.success(response, 5)
      let msgs = await this.fetchScheduleMsgs()
      this.setState({
        tableSource: msgs.map((x, i) => ({
          ind: i,
          contact: x.contactNo,
          vehicle: x.vehicleNo,
          date: x.expiryDate,
          createdDate: x.createdDate,
        })),
        isLoading: false,
        contacts: "",
        vehicles: "",
      })
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * This is React Life Cycle Method
   * This Method Execute fetchScheduleMsgs Methods
   */
  componentDidMount() {
    try {
      Promise.all([this.fetchScheduleMsgs()]).then(([msgs]) => {
        this.setState({
          tableSource: msgs.map((x, i) => ({
            ind: i,
            contact: x.contactNo,
            vehicle: x.vehicleNo,
            date: x.expiryDate,
            createdDate: x.createdDate,
          })),
          isLoading: false,
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    // Destructurization of States
    const { tableCols, tableSource, isLoading } = this.state
    return (
      <React.Fragment>
        <Spin spinning={isLoading} size="large">
          <div className="schedule-msg">
            <Card>
              <Row gutter={[16, 16]}>
                <h2>Schedule Message</h2>
                <Col span={24}>
                  <Table
                    columns={tableCols}
                    dataSource={tableSource}
                    rowKey={(record) => `row-${record.ind}`}
                    bordered
                    loading={!tableSource.length}
                    size="small"
                  ></Table>
                </Col>
                <Col span={24} lg={12}>
                  <label>Contact numbers:</label>
                  <Input.TextArea
                    placeholder="Contact numbers"
                    onChange={(e) =>
                      this.setState({ contacts: e.target.value })
                    }
                    onBlur={() => {
                      this.setState((state, prop) => ({
                        contacts: state.contacts.trim(),
                      }))
                    }}
                    value={this.state.contacts}
                  ></Input.TextArea>
                </Col>
                <Col span={24} lg={12}>
                  <label>Vehicle numbers:</label>
                  <Input.TextArea
                    placeholder="Vehicle numbers"
                    onChange={(e) =>
                      this.setState({ vehicles: e.target.value })
                    }
                    onBlur={() => {
                      this.setState((state, prop) => ({
                        vehicles: state.vehicles.trim(),
                      }))
                    }}
                    value={this.state.vehicles}
                  ></Input.TextArea>
                </Col>
                <Col span={24}>
                  <label>Set expiry date:</label>
                  <br />
                  <DatePicker
                    onChange={(momentDate, dateString) =>
                      this.setState({
                        expiryDate: momentDate.format("YYYY-MM-DD"),
                      })
                    }
                  ></DatePicker>
                </Col>
                <Col span={24}>
                  <Button type="primary" onClick={this.onSaveClick}>
                    Save
                  </Button>
                </Col>
              </Row>
            </Card>
          </div>
        </Spin>
      </React.Fragment>
    )
  }
}

// Export The Current Component
export default ScheduleMsg
