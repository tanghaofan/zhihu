import React, {Component} from 'react';
import ReactDom from 'react-dom';
import '../less/zhihu.less';


const data = [
    {
        "name": "magasa",
        "slug": "magasa",
        "avatarUrl": "./user_avatar_1.png",
        "bio": "电影杂志《虹膜》主编（支持ios/Android平台）",
        "id": 1,
    },
    {
        "name": "程毅南",
        "slug": "cheng-yi-nan",
        "avatarUrl": "./user_avatar_1.png",
        "bio": "美国心理学和经济学本科毕业。强推《知识分子与社会》",
        "id": 2,
    },
    {
        "name": "田吉顺",
        "slug": "tian-ji-shun",
        "avatarUrl": "./user_avatar_1.png",
        "bio": "妇产科医生",
        "id": 3,
    },
    {
        "name": "周源",
        "slug": "zhouyuan",
        "avatarUrl": "./user_avatar_1.png",
        "bio": "知乎 001 号员工",
        "id": 4,
    },
    {
        "name": "黄继新",
        "slug": "jixin",
        "avatarUrl": "./user_avatar_1.png",
        "bio": "和知乎在一起",
        "id": 5,
    },
    {
        "name": "李申申",
        "slug": "shen",
        "avatarUrl": "./user_avatar_1.png",
        "bio": "知乎 002 号员工",
        "id": 6,
    },
    {
        "name": "Raymond Wang",
        "slug": "raymond-wang",
        "avatarUrl": "./user_avatar_1.png",
        "bio": "lawyer",
        "id": 7,
    }
]

class SearchBar extends Component {
    onHandleChange () {
        console.log(this.refs.inp)
        this.props.onFilterText(this.refs.inp.value);
    }
    render () {
        let inviteList = this.props.inviteList;
        let row = inviteList.map((ele, index) => {
            return <strong style={ { color: '#000' } } key={index + 100}>{ele.name + ','}</strong>;
        })
        return (
            <div className="search">
                <span>您已经邀请{row}等{row.length}人</span>
                <input type="text" ref='inp' placeholder='搜索你想邀请的人' onChange={this.onHandleChange.bind(this)} />
            </div> 
        )
    }
} 

class InviteItem extends Component {
    onHandleClick () {
        this.props.onTouchHandle(this.props.message.id);
    }
    render () {
        return (
            <li className='item' >
                <img src={"./src/img/" + this.props.message.avatarUrl }alt=""/>
                <div className="name">{this.props.message.name}</div>
                <div className="bio">{this.props.message.bio}</div>
                <button style={this.props.message.canInvited ? {color: '#11a668', border: '1px solid #11a668'} : {color: '#8590a6', border: '1px solid #ccd8e1'}} onClick={this.onHandleClick.bind(this)} > {this.props.message.canInvited ? '邀请回答' : '取消邀请'} </button>

            </li>
        )
    }
}

class InviteList extends Component {
    componentWillMount() {
        this.onDealData();
    }
    shouldComponentUpdate(nextProps, newState) {
        this.props = nextProps;
        this.onDealData();
        return true;
    }
    onDealData () {
        var row = [];
        let {data, filterText, onTouchHandle} = this.props;
        data.forEach( (ele, index) => {
            if (ele.name.indexOf(filterText) !== -1) {
                row.push(
                    <InviteItem onTouchHandle={onTouchHandle} key={index + 1000} message={ele} ></InviteItem>
                )
            }

        });
        this.row = row;
    }
    render () {
        return (
            <div className="List">
                <ul>
                    {
                        this.row
                    }
                </ul>
            </div>
        )
    }
}

class App extends Component {
    constructor () {
        super();
        this.state = {
            filterText: '',
            list: [],
            inviteList: []
        }
    }
    componentWillMount () {
        let newList = [];
        this.props.data.forEach( (ele, index) => {
            ele.canInvited = true;
            newList.push(ele);
        });
        this.setState({
            list: newList
        })
    }
    onFilterText(text) {
        this.setState({
            filterText: text
        })
    }
    onTouchHandle(id) {
        let list = this.state.list;
        let orderList = [...this.state.inviteList];
        console.log(list,orderList)
        for (let i = 0; i < list.length; i ++) {
            if (list[i].id == id) {
                list[i].canInvited = !list[i].canInvited;
                if (!list[i].canInvited) {
                    orderList.unshift(list[i]);
                }
                break;
            }
        }
        orderList = orderList.filter( (ele, index) => {
            return !ele.canInvited;
        })
        this.setState({
            inviteList: orderList
        })
    }
    render () {
        return (
            <div className="wrapper">
                <SearchBar inviteList={this.state.inviteList} onFilterText={this.onFilterText.bind(this)} ></SearchBar>
                <InviteList filterText={this.state.filterText} data={this.state.list} onTouchHandle={this.onTouchHandle.bind(this)} ></InviteList>
            </div>  
        )
    }
}

ReactDom.render(
    <App data={data}></App>,
    document.getElementById('root')
)
