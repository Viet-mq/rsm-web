import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect} from "react";
import {Switch, Tabs} from "antd";
import Search from "antd/es/input/Search";
import {RiMailSendLine} from "react-icons/all";
import {Link} from "react-router-dom";
import {getListEmail, showFormUpdate} from "../../redux/actions";
import moment from "moment";
import {UpdateEmailRequest} from "../../types";

const {TabPane} = Tabs;

const mapStateToProps = (state: RootState) => ({
  emailManager: state.emailManager,

})

const connector = connect(mapStateToProps,
  {
    getListEmail,
    showFormUpdate
  })


type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListEmail(props: IProps) {
  let {list} = props.emailManager
  let screenWidth = document.documentElement.clientWidth;
  const operations = <Search
    placeholder="Tìm kiếm nhanh mẫu email"
    // onSearch={value => onSearch(value)}
    style={{width: 235}}
  />;

  useEffect(() => {
    props.getListEmail({page: 1, size: 90});
  }, []);

  function handleShowEditEmail(value: UpdateEmailRequest) {
    props.showFormUpdate(value)
  }

  return (
    <div className="list-email-container mt-2">
      <Tabs tabBarExtraContent={operations}>
        <TabPane tab="XÁC NHẬN ỨNG TUYỂN" key="1">
          {list.rows?.map((item: any, index: any) => {
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
                <Switch defaultChecked className="mr-2"/>
              </div>
            </div>

          })}

        </TabPane>
        <TabPane tab="INTERVIEW" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="OFFER" key="3">
          Content of tab 3
        </TabPane>
        <TabPane tab="REJECT" key="4">
          Content of tab 3
        </TabPane>
      </Tabs>
    </div>
  );

}

export default connector(ListEmail);
