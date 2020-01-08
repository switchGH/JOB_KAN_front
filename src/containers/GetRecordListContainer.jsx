import { connect } from 'react-redux';
import RecordList from '../components/recordList/RcordList';

let count = 0;

const mapStateToProps = (state) => {
    count++
    console.log(count)
    console.log('below is state')
    console.log(state)
    const length = state.users.length;
    const currentState = state.users[length - 1];
    let list = []
    console.log('below is currentState')
    if(length - 1 == 2){
        console.log(state.users[length - 1].usersList[0].record)
        list = state.users[length - 1].usersList[0].record
    }
    // console.log(currentState.items)
    return { recordList: list }
}

const GetRecordList = connect(
    mapStateToProps
)(RecordList)

export default GetRecordList
