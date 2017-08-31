import React from 'react'
import {
    Button,
    message,
    Modal
} from 'antd'
import SearchBar from 'components/searchbar'
import Table from 'components/table'
import {
    FormModal
} from 'components/modalForm'
import 'whatwg-fetch'
import fetchJsonp from 'fetch-jsonp'
import './index.less'
import moment from 'moment'
import {
    musicKindList,
    
    publishCountry
} from '../../utils/config'



require('es6-promise').polyfill();

const confirm = Modal.confirm
let singerKindList={};
export default class Music extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tData: [],
            item: {},
            loading: true,
            modalShow: false,
            modalShowEdit: false,
        }
        this.add = this.add.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onOkEdit = this.onOkEdit.bind(this)
        this.onCancelEdit = this.onCancelEdit.bind(this)
    }




    // 获取表格数据
    fetchTableData = (typeId, searchFields) => {
       

        fetchJsonp("https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=" + typeId + "&_=1492910996732", {
               
                 jsonpCallback:"jsonpCallback",
                 
        
            })
            .then((res) => {
                return res.json();
              
            })
            .then((data) => {
                console.log(data);
                
                const songArray = []
                let songList = data.songlist;
              singerKindList=songList.map(function (ele) {
                  return ele.data.singer[0];
              });
            console.log(singerKindList);
            
                if (searchFields && searchFields.country && searchFields.country.toString() !== '0') { // 发行国家搜索
                    // eslint-disable-next-line
                    songList = songList.filter(ele => ele.country === publishCountry.find(t => t.value === parseInt(searchFields.country), 10).mean)
                }
                if (searchFields && searchFields.singer && searchFields.singer.toString() !== '0') { // 歌曲语种搜索
                    // eslint-disable-next-line
                    songList = songList.filter(ele => ele.singer === singerKindList.find(t => t.value === parseInt(searchFields.singer), 10).mean)
                }
                // if (searchFields && searchFields.start) { // 发行时间段收索
                //     songList = songList.filter(ele => moment(ele.publishtime) >= moment(searchFields.start) && moment(ele.publishtime) <= moment(searchFields.end))
                // }

                for (let i = 0; i < songList.length; i++) {
                    songArray.push({
                        title: songList[i].data.songname,
                        author: songList[i].data.singer[0].name,
                        country: songList[i].data.albumname,
                        singer: songList[i].singer,
                        songid:songList[i].data.songid,
                        album:"https://y.gtimg.cn/music/photo_new/T002R150x150M000"+songList[i].data.albummid+".jpg?max_age=2592000"
                        
                    })
                }
                this.setState({
                    tData: songArray,
                    loading: false
                });
               
            })
            .catch((e) => {
                console.log(e.message);
            });
    }

    componentDidMount() {
        this.fetchTableData('4') // 默认是热歌版
    }

    onSearch = (searchFields) => {
        const typeId = searchFields.type ? searchFields.type : 4
        this.fetchTableData(typeId, searchFields)
    }

    searchFields = () => {
        return [{
            title: '歌曲榜单',
            key: 'type',
            type: 'select',
            defaultValue: "流行指数",
            onChange: (value) => this.fetchTableData(value),
            items: () => musicKindList.map(ele => ({
                value: ele.value,
                mean: ele.mean
            })),
        }]
    }

    tableHeader = () => {
        return [{
            dataIndex: 'title',
            title: '歌曲名',
            width: 200,
            // render: (text, record) => {
            // }
        }, {
            dataIndex: 'author',
            title: '歌手',
            width: 200,
        }, {
            dataIndex: 'country',
            title: '所属专辑',
            width: 200,
        }, {
            dataIndex: 'album',
            title: '专辑封面',
            width: 200,
           render:(text)=><img src={text} width="50" height="50"/>
        },
        
    ]
    }

    add() {
        this.setState({
            modalShow: true
        })
    }

    onOk(param) {
        message.success('添加成功')
        this.onCancel()
    }

    onCancel() {
        this.setState({
            modalShow: false
        })
    }

    onOkEdit(param) {
        this.setState({
            modalShowEdit: false
        })
        message.success('编辑成功')
    }

    onCancelEdit() {
        this.setState({
            modalShowEdit: false
        })
    }

    tableAction = (actionKey, item) => {
        if (actionKey === 'edit') {
            this.setState({
                item: item,
                modalShowEdit: true
            })
        } else if (actionKey === 'delete') {
             console.log(this.state.tData);
            confirm({
                title: '提示',
                content: '确定删除 '+item.title+' 吗',
                onOk: () => {
                   
                    
                    let newData = this.state.tData.filter(ele=> ele.songid!=item.songid );
                    
                    this.setState({tData:newData});
                    message.success('删除成功')
                },
                onCancel() {}
            })
        }
    }

    fields = () => {
        return [{
            label: '歌曲名',
            type: 'input',
            name: 'title',
            options: {
                rules: [{
                    required: true,
                    message: '歌曲名必输!',
                }]
            }
        }, {
            label: '歌手名',
            type: 'input',
            name: 'author',
            options: {
                rules: [{
                    required: true,
                    message: '歌手必输!',
                }]
            }
        }, {
            label: '所属专辑',
            type: 'select',
            name: 'country',
            items: () => publishCountry.map(ele => ({
                key: ele.value,
                value: ele.mean
            })),
            options: {
                rules: [{
                    required: true,
                    message: '所属专辑需输!',
                }]
            }
        }
    ]
    }

    fieldsEdit = () => {
        const item = this.state.item
        return [{
            label: '歌曲名',
            type: 'input',
            name: 'title',
            items: item.title,
            options: {
                initialValue: item.title,
                rules: [{
                    required: true,
                    message: '歌曲名必输!',
                }]
            }
        }, {
            label: '歌手名',
            type: 'input',
            name: 'author',
            options: {
                initialValue: item.author,
                rules: [{
                    required: true,
                    message: '歌手必输!',
                }]
            }
        }]
    }

    render() {
        return (
            <div id="wrap">
                <SearchBar
                    onSubmit={this.onSearch}
                    fields={this.searchFields()}
                />
                <div className="tableBox">
                    <Button onClick={this.add} className="addButton">添加</Button>
                    <div style={{ paddingTop: 43 }}>
                        <Table
                            onCtrlClick={ this.tableAction }
                            pagination={ true }
                            pageSize={10}
                            header={ this.tableHeader() }
                            data={ this.state.tData }
                            loading={ this.state.loading }
                            action={row => [{
                                key: 'edit',
                                name: '修改',
                                color: 'blue',
                                icon: 'edit',
                            }, {
                                key: 'delete',
                                name: '删除',
                                color: 'red',
                                icon: 'delete'
                            }]}
                            scroll={{y: 385 }}
                        />
                    </div>
                </div>
                <FormModal
                    modalKey="add"
                    visible={this.state.modalShow}
                    title="添加音乐"
                    fields={this.fields()}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    okText="保存"
                />
                <FormModal
                    modalKey="Edit"
                    visible={this.state.modalShowEdit}
                    title="修改音乐"
                    fields={this.fieldsEdit()}
                    onOk={this.onOkEdit}
                    onCancel={this.onCancelEdit}
                    okText="保存"
                />
            </div>
        )
    }
}