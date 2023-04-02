/**
 * Import React Package.
 */
import React from "react";

/**
 * Ant Design Components Import.
 */
import { Row, Col, Table, Card, Input, Button, message, Spin } from "antd";

/**
 * The Handler Is Used To Perform Various Tasks.
 * If You Need To Check What Handler Do Please Check Handler Folder
 */
import handler from "../handlers";

/**
 * This Is Class Of This Funtional Component.
 */
class Customers extends React.Component {
  // Constructure Which is used to Initialize States.
  constructor(props) {
    super(props);
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
      ],
      tableSource: [],
      vehicles: "",
      contacts: "",
      isLoading: true,
    };
  }

  // Fetch all Customers
  fetchCustomers = () => {
    try {
      handler.customers.getCustomers().then((customers) =>
        this.setState({
          tableSource: customers.map((x) => ({
            contact: x.contactNo,
            vehicle: x.vehicleNo,
          })),
          isLoading: false,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This is React Life Cycle Method
   * This Method Execute FetchCustomer Method
   */
  componentDidMount() {
    try {
      this.fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  }

  // This Method Add New Customer In Database
  onSaveClick = () => {
    try {
      const { contacts, vehicles } = this.state;
      let isError = false;
      let errorMsg = "";
      if (!contacts) {
        isError = true;
        errorMsg = "Please enter contact nos";
      } else if (!vehicles) {
        isError = true;
        errorMsg = "Please enter vehicle nos";
      }
      if (!!errorMsg) message.error(errorMsg);
      if (!isError) {
        this.setState({ isLoading: true });
        handler.customers
          .addCustomers({
            customers: contacts.split("\n"),
            vehicles: vehicles.split("\n"),
            bulk: true,
          })
          .then((response) => {
            if (response) message.success("Success");
            else message.error("Failed");

            this.fetchCustomers();
          });
      }
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    // Destructuring of States
    const { tableCols, tableSource, isLoading } = this.state;
    return (
      <React.Fragment>
        <Spin spinning={isLoading} size="large">
          <div className="customers">
            <Card>
              <Row gutter={[16, 16]}>
              {/* title of the Page */}
                <Col span={24}>
                  <h2>Customers</h2>
                </Col>

                 {/* Display All Existing Customer Data  */}
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
              </Row>
              <Row gutter={[16, 16]}>
                {/* Add New Customer Section */}
                <Col span={24}>
                  <h4>Add Customers</h4>
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
                      }));
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
                      }));
                    }}
                    value={this.state.vehicles}
                  ></Input.TextArea>
                </Col>
                <Col span={24}>
                  <Button
                    size="default"
                    type="primary"
                    onClick={this.onSaveClick}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </Card>
          </div>
        </Spin>
      </React.Fragment>
    );
  }
}

// Export The Current Component
export default Customers;
