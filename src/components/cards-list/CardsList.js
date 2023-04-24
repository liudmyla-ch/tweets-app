import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'components/card/Card';
import css from './CardsList.module.css';
import PropTypes from 'prop-types';

axios.defaults.baseURL = 'https://64353194537112453fcfda1a.mockapi.io';

export const CardList = () => {
  const [users, setUsers] = useState([]);
  const [displayCount, setDisplayCount] = useState(3);

  const fetchData = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(setUsers);
  }, []);

  const handleClick = async (id, isFollowing, followers) => {
    const newIsFollowing = !isFollowing;
    const newFollowers = isFollowing ? followers - 1 : followers + 1;
    try {
      await axios.put(`/users/${id}`, {
        followers: newFollowers,
        isFollowing: newIsFollowing,
      });
      fetchData(setUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const onLoadMore = () => {
    const newDisplayCount = displayCount + 3;
    setDisplayCount(newDisplayCount);
  };
  return (
    <>
      <ul className={css.cardsList}>
        {users?.slice(0, displayCount).map(user => {
          return (
            <Card key={user.id} userInfo={user} clickFollow={handleClick} />
          );
        })}
      </ul>
      {users.length !== displayCount ? (
        <button onClick={onLoadMore} className={css.loadMoreBtn}>
          Load More
        </button>
      ) : (
        <p className={css.theEndOfList}>Oops! This is the end</p>
      )}
    </>
  );
};


Card.propTypes = {
  userInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    tweets: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired,
  }).isRequired,
  clickFollow: PropTypes.func.isRequired,
};