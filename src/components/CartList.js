import { Table } from "antd";
import React, { useState } from "react";
import { Button } from "antd";

export default function CartList(props) {
  var finalResult = {};
  props.cartValue.forEach(v => {
    if (finalResult.hasOwnProperty(v.bookID)) {
      finalResult[v.bookID].quantity += 1;
      finalResult[v.bookID].price += v.price;
    } else {
      finalResult[v.bookID] = {};
      finalResult[v.bookID] = v;
      finalResult[v.bookID].quantity = 1;
    }
  });
  var cartFinalValue = [];
  Object.keys(finalResult).forEach(function(key) {
    cartFinalValue.push(finalResult[key]);
  });
  console.log(finalResult);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    }
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Author",
      dataIndex: "authors",
      key: "authors"
    },
    {
      title: "Language",
      dataIndex: "language_code",
      key: "language_code"
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    }
  ];

  return (
    <div>
      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={cartFinalValue}
        pagination={false}
      />
      <Button type="primary" block style={{ marginTop: 20 }}>
        Checkout
      </Button>
    </div>
  );
}
