import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {Pagination, Tabs} from "antd";
import Search from "antd/es/input/Search";
import {RiMailSendLine} from "react-icons/all";
import {Link} from "react-router-dom";
import {deleteEmail, searchListEmail, showFormUpdate} from "../../redux/actions";
import moment from "moment";
import {DeleteEmailRequest, EmailEntity, UpdateEmailRequest} from "../../types";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {email_path} from "../../../../helpers/utilsFunc";

const {TabPane} = Tabs;

const mapStateToProps = (state: RootState) => ({
  emailManager: state.emailManager,

})
const connector = connect(mapStateToProps,
  {
    searchListEmail,
    showFormUpdate,
    deleteEmail
  })

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListEmail(props: IProps) {
  let {search} = props.emailManager
  const [page, setPage] = useState(1);
  const scroll = {y: 600};
  const size = 30;
  const [email, setEmail] = useState<any>()
  const [nameSearch, setNameSearch] = useState<any>("")
  const operations = <Search
    placeholder="Tìm kiếm nhanh mẫu email"
    onChange={e => setNameSearch(e.target.value)}
    onSearch={btnSearchClicked}
    style={{width: 235}}
  />;

  useEffect(() => {
    btnSearchClicked()
  }, [page]);

  useEffect(() => {
    setEmail(search)
  }, [search])

  function handleShowEditEmail(value: UpdateEmailRequest) {
    props.showFormUpdate(value)
  }

  function btnSearchClicked() {
    const req: any = {
      page: page,
      size: size,
      name: nameSearch
    }
    props.searchListEmail(req);
  }

  const handleDelete = (event: any, entity: EmailEntity) => {
    let req: DeleteEmailRequest = {
      id: entity.id
    }
    props.deleteEmail(req);
  }

  return (
    <div className="list-email-container mt-2">
      <Tabs tabBarExtraContent={operations}>
        <TabPane tab="DANH SÁCH MẪU EMAIL" key="1">
          {email?.rows?.map((item: any, index: any) => {
            return <div key={item.id} className="border-bottom flex-space-between-item-center"
                        style={{padding: " 15px 0"}}>
              <div className="flex-items-flex-start">
                <div style={{marginRight: 10, color: "#969C9D"}}>
                  <RiMailSendLine size={40}/>
                </div>
                <div>
                  <div>
                    <Link to={"/email-manager/detail"} onClick={() => handleShowEditEmail(item)}
                          className="font-17-bold-500"
                          style={{marginRight: "1px", color: "#1890ff"}}>
                      <span>{item.name}</span>
                    </Link>
                  </div>

                  <div className="font-14-bold-500">{item.subject}</div>
                  <div style={{color: "#B2B2B2"}}>Tạo bởi <span
                    className="font-14-bold-500">{item.create_by}</span> lúc {moment(item.time).format('HH:mm DD/MM/YYYY')}
                  </div>
                </div>
              </div>

              <div>
                <ButtonDelete path={email_path} message="Email" action="delete"
                              handleClick={(event) => handleDelete(event, item)}/>
              </div>
            </div>


          })}
          <br/>
          <Pagination
            current={page}
            total={email?.total}
            pageSize={size}
            onChange={value => setPage(value)}
            className="pagination"
          />
        </TabPane>
        {/*<TabPane tab="INTERVIEW" key="2">*/}
        {/*  Content of tab 2*/}
        {/*</TabPane>*/}
        {/*<TabPane tab="OFFER" key="3">*/}
        {/*  Content of tab 3*/}
        {/*</TabPane>*/}
        {/*<TabPane tab="REJECT" key="4">*/}
        {/*  Content of tab 3*/}
        {/*</TabPane>*/}
      </Tabs>
    </div>
  );

}

export default connector(ListEmail);
