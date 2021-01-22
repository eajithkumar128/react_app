import BookList from "./BookList";
import SearchBook from "./SearchBook";
import axios from "axios";
import { useState, useEffect } from "react";
import { Select } from "antd";
import { notification } from "antd";

const { Option } = Select;
notification.config({
  placement: "bottomRight",
  bottom: 50,
  duration: 2,
  rtl: true
});

const BOOK_URL =
  "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json";

export default function MainContent(props) {
  const [searchInput, setSearchInput] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [filteredList, setFilteredBookList] = useState([]);
  const [cartList, setCartList] = useState([]);
  useEffect(async () => {
    var apiResult = await axios.get(BOOK_URL);
    console.log(apiResult);
    apiResult.data.sort(
      (a, b) => parseFloat(b.average_rating) - parseFloat(a.average_rating)
    );
    setBooksList(apiResult.data);
    setFilteredBookList(apiResult.data);
  }, []);

  useEffect(() => {
    if (cartList.length !== 0) {
      props.updateCartCount(cartList.length);
      props.updateCart(cartList);
      openNotification();
    }
  }, [cartList]);

  const updateCartList = async val => {
    setCartList([...cartList, val]);
  };

  const updateSearchResults = input => {
    let filteredResult = booksList.filter(v => {
      let title = String(v.title).toLowerCase();
      return !input || title.includes(input.toLowerCase());
    });
    setSearchInput(input);
    setFilteredBookList(filteredResult);
  };

  const openNotification = () => {
    notification["success"]({
      message: "Added to cart successfully",
      bottom: 0
    });
  };

  const handleChange = value => {
    let sortedResult = [];
    if (value === "highRated") {
      sortedResult = booksList.sort(
        (a, b) => parseFloat(b.average_rating) - parseFloat(a.average_rating)
      );
    }
    if (value === "lowPrice") {
      sortedResult = booksList.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    }
    if (value === "highPrice") {
      sortedResult = booksList.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }
    setFilteredBookList([...sortedResult]);
  };

  return (
    <div>
      <SearchBook
        searchInput={searchInput}
        onInputChange={updateSearchResults}
      />
      <div style={{ width: "100%" }}>
        <Select
          defaultValue="-- Best Rated --"
          align="right"
          style={{ width: 200, marginTop: "20px", paddingLeft: "40px" }}
          onChange={handleChange}
        >
          <Option value="highRated">Best Rated</Option>
          <Option value="lowPrice">Lowest price First</Option>
          <Option value="highPrice">Highest Price First</Option>
        </Select>
      </div>

      <BookList bookList={filteredList} addToCart={updateCartList} />
    </div>
  );
}
