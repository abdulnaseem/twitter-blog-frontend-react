import React, {useEffect, useState} from 'react';
import './user-search.component.css';
import { getUsers } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BiSearchAlt2 } from 'react-icons/bi';
import CardList from './card-list/card-list.component';
import SearchBox from './search-box/search-box.component';


const UserSearch = ({ getUsers, auth: { users, loading } }) => {

    
    const [data, setData] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        fetch('/api/v1.0/tweets/users/all')
        .then((res) => res.json())
        .then((user) => setData(user))
    }, []);

    console.log(data)
  
    useEffect(() => {
      const newFilteredUser = data.filter((user) => {
        return user.loginId.toLocaleLowerCase().includes(searchUser);
      });
      setFilteredData(newFilteredUser);
    }, [data, searchUser]);
    // //filter through these monsters whenever monsters or searchField changes
  
  
    const onSearchChange = (event) => {
      const searchFieldString = event.target.value.toLocaleLowerCase();
      setSearchUser(searchFieldString);
    }

    console.log(filteredData)

    return (
        <div className='container'>
            <SearchBox className="monster-search-box" onChangeHandler={onSearchChange} placeholder="search monsters" />
            <CardList data={filteredData} />       
        </div>
    )
}

UserSearch.propTypes = {
    getUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { getUsers })(UserSearch);