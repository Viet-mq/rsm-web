import React, {useEffect} from "react";
import HeaderBar from "../components/HeaderBar";
import ListContent from "../components/ListContent";
import ListingHeader from "../components/ListingHeader";
import CreateContentForm from "../components/CreateContentForm";

function ContentManagerPage() {

  useEffect(() => {
    document.title = "Quản lý nội dung";
  }, []);

  return (
    <div className="contentPage">
      <HeaderBar/>
      <ListingHeader/>
      <ListContent/>

      <CreateContentForm/>

    </div>
  )
}

export default ContentManagerPage;
