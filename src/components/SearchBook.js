import { Input } from "antd";
import "./SearchBook.css";

export default function SearchBook(props) {
  return (
    <div className="searchBoxDiv">
      <Input
        placeholder="Search Books"
        value={props.searchInput}
        onChange={e => props.onInputChange(e.target.value)}
      />
    </div>
  );
}
