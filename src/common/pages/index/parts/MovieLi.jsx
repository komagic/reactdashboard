import React, { Component } from 'react'
import "./MovieLi.less";
import { Spin } from 'antd'; 
export default class MovieLi extends Component {
    state={
        loading:true
    }

componentWillReceiveProps = (nextProps) => {
    if(nextProps){
        this.setState({loading:false});
    }
}


    render() {      
        let data= this.props.mdata.subjects||[];
 
        const mli= data.map(function (ele){
            return ( <li className="list-group-item">
                    <a className="pull-left w-40 mr-m">
                      <img
                        src={ele.images.small}
                        className="img-responsive img-small"
                        alt="test"
                      />
                    </a>
                    <div className="clear">
                      <a className="block">{ele.directors[0].name}</a>
                      <span className="text-muted text-description">{ele.title}  {ele.rating.average}分</span>
                    </div>
</li>)  });
  console.log(data);
        return (
            <div>
                 <Spin spinning={this.state.loading}/>
                {mli}</div>   
        );
    }
}






