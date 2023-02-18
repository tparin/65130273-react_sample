import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Container, Navbar, Form, Row, Col, Card, Table, Image } from "react-bootstrap";
import axios from "axios";
import Common from "./common";
const BASE_URL = Common.API_URL;
export default class report extends Component {
  state = {
    zipcode: 11000,
    amphur_code: 0,
    amphur_name: "",
    province_code: 0,
    province_name: "",
    district: [],
  };
  getData = async () => {
    if (this.state.zipcode.length < 5) {
      return false
    };
    try {
        await axios
        .get(`${BASE_URL}/${this.state.zipcode}`)
        .then((response) => {
          let res = response.data;

          if (res.district === undefined) {
            this.setState({
              district: [],
            });
          }
          this.setState({
            amphur_name: res.amphur_name,
            province_name: res.province_name,
            district: res.district,
          });
        })
        .catch((err) => {
          console.log(err);
        }); 
    } catch (error) {
      console.log(error);
    }
  };
  filter = (e) => {
    this.setState({
      zipcode: e.target.value,
    });
    this.getData();
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    const { district } = this.state;
    return (
      <div>
        <Navbar bg="secondary" variant="dark">
          <Container>
            <Navbar.Brand href="#">ค้นหาเลขไปรษณีย์</Navbar.Brand>
            <div style={{display: "flex", alignItems: "center"}}>
              <Image src="https://avatars.githubusercontent.com/u/125713570?s=400&u=57d4d30f3fca77cdbfc13e2c47ca3384a242016b&v=4" roundedCircle thumbnail style={{ width: "80px", marginRight: "20px" }} />
              <p style={{ fontSize: "1.2rem", fontWeight: 500, color: "#fff", margin: 0 }}>รหัสนักศึกษา : 65130273, นายปรินทร์ ตรีเอกานุภาพ</p>
            </div>
          </Container>
        </Navbar>
        <Container>
          <div style={{ paddingTop: "50px" }}>
            <Row>
              <Col lg="9">
                <div align="left">
                  <h3>
                    อำเภอ <u>{this.state.amphur_name}</u> จังหวัด{" "}
                    <u>
                      {this.state.province_name} {this.state.zipcode}
                    </u>
                  </h3>
                </div>
              </Col>
              <Col lg="3">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="ระบุเลขไปรษณีย์ 5 หลัก"
                    onChange={this.filter}
                    onKeyUp={this.filter}
                    maxLength="5"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div style={{ paddingTop: "15px" }}>
            <Card>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>รหัสตำบล</th>
                      <th>ตำบล</th>
                    </tr>
                  </thead>
                  <tbody>
                    {district?.map((rs, index) => (
                      <tr key={index}>
                        <td align="center">{index + 1}</td>
                        <td>{rs.district_code}</td>
                        <td>{rs.district_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
}
