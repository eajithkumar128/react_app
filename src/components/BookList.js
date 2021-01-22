import { List, Card } from "antd";
import "./BookList.css";
import { Button } from "antd";
import { RatingStar } from "rating-star";
import { Row, Col } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Popover } from "antd";

function BookList(props) {
  return (
    <div className="bookListDiv">
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3
        }}
        dataSource={props.bookList.slice(0, 100)}
        renderItem={item => (
          <List.Item>
            <Card title={item.title}>
              <Row>
                <Col span={21}>
                  <div>Author : {item.authors}</div>
                  <div>price : {item.price}</div>
                  <div>Language : {item.language_code}</div>
                  <div>
                    Rating:{" "}
                    <RatingStar
                      maxScore={5}
                      id="123"
                      rating={
                        typeof item.average_rating === "number"
                          ? item.average_rating
                          : 1
                      }
                    />
                  </div>
                </Col>
                <Col span={3} align="center">
                  <Popover content="Add to cart" trigger="hover">
                    <ShoppingCartOutlined
                      onClick={() => props.addToCart(item)}
                      style={{ fontSize: "24px" }}
                    />
                  </Popover>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default BookList;
