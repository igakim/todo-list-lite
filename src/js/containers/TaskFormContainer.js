import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import TaskForm from '../components/TaskForm.jsx';

const mapStateToProps = () => ({});

export default connect(mapStateToProps, actionCreators)(TaskForm);
