import React from "react";
import { Row, Col, Card, Timeline, Icon,Badge  } from "antd";
import EchartsViews from "./EchartsViews";
import EchartsProjects from "./EchartsProjects";

import "./index.less";
import fetchJsonp from "fetch-jsonp";
import MovieLi from "./parts/MovieLi";


export default class index extends React.Component {

  

  constructor(props) {
    super(props);
    this.state = {
      douBanData: {},
      item:{},
     
    };


    this.getDouBanBooks=this.getDouBanBooks.bind(this);
  }

  
  //获取豆瓣电影热榜
  getDouBanBooks = xurl => {
    fetchJsonp(xurl, { jsonCallback: "jsonCallback" })
      .then(res => {
        return res.json();
      })
      .then(data => {
        
        this.setState({douBanData:data});
        this.setState({item:data.subjects})
       

      })
      .catch(e => {
        console.log(e.message);
      });
  };




  componentWillMount() {
    let xhrul = "http://api.douban.com/v2/movie/in_theaters?start=0&count=5";
    this.getDouBanBooks(xhrul);
  }




  render() {
  


    return (
      <div>
        <Row gutter={10}>
          <Col span={4}>
            <div className="cloud-box">
              <Card>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    <Icon type="hdd" className="text-2x warning" />
                  </div>
                  <div className="clear">
                    <div className="text-muted">容量</div>
                    <h2>300 GB</h2>
                  </div>
                </div>
              </Card>
            </div>
            <div className="cloud-box">
              <Card>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    <Icon type="cloud" className="text-2x" />
                  </div>
                  <div className="clear">
                    <div className="text-muted">云数据</div>
                    <h2>30122</h2>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
          <Col span={4}>
            <div className="cloud-box">
              <Card>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    <Icon type="camera" className="text-2x text-info" />
                  </div>
                  <div className="clear">
                    <div className="text-muted">照片</div>
                    <h2>802</h2>
                  </div>
                </div>
              </Card>
            </div>
            <div className="cloud-box">
              <Card>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                   <Badge count={102} style={{top:"0px"}}>
                    <Icon type="mail"  className="text-2x text-success" />
                     </Badge>
                  </div>
                  <div className="clear">
                    <div className="text-muted">邮件</div>
                    <h2>102</h2>
                  </div>
                </div>
              </Card>
            </div>
          </Col>

          <Col span={16}>
            <div className="cloud-box">
              <Card className={"no-padding"}>
                <EchartsProjects />
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <div className="cloud-box">
              <Card>
                <div className="pb-m">
                  <h3>后台日志</h3>
                  <small>2个待完成，1个正在进行中</small>
                </div>
                <a className="card-tool">
                  <Icon type="sync" />
                </a>
                <Timeline>
                  <Timeline.Item color="#108ee9">
                    <p>更多模块开发中</p>
                  </Timeline.Item>

                  <Timeline.Item color="green">引人Redux,Fetch</Timeline.Item>
                  <Timeline.Item color="green">
                    引人Less,React-Router(4.x)
                  </Timeline.Item>
                  <Timeline.Item color="green">初始化项目</Timeline.Item>
                </Timeline>
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <div className="cloud-box">
              <Card>
                <div className="pb-m">
                  <h3>热映电影top5 -- (北京) (豆瓣api)</h3>
                </div>
                <a className="card-tool">
                  <Icon type="sync" />
                </a>
                <ul className="list-group no-border">
                  <MovieLi mdata={this.state.douBanData}/>
             
                </ul>
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <div className="cloud-box">
              <Card>
                <div className="pb-m">
                  <h3>蒸发量,降水量</h3>
                  <small>虚构数据</small>
                </div>
                <a className="card-tool">
                  <Icon type="sync" />
                </a>
                <EchartsViews />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
