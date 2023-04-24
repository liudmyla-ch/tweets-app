import css from './Card.module.css';
import logo from './Logo.svg';
import PropTypes from 'prop-types';

export const Card = ({ userInfo, clickFollow }) => {
  const { id, avatar, tweets, followers, user, isFollowing } = userInfo;

  const formattedFollowers = followers.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  });

  return (
    <li key={id}>
      <div className={css.card}>
        <img
          className={css.logo}
          src={logo}
          alt="logo"
          width="76"
          height="22"
        />
        <div className={css.header}></div>
        <div className={css.line}></div>
        <div className={css.user}>
          <div className={css.avatarBox}>
            <div className={css.avatar}>
              <img
                src={avatar}
                alt={user}
                width="62"
                height="62"
                className={css.avatarImg}
              />
            </div>
          </div>
          <div className={css.info}>
            <p className={css.text}>{tweets} TWEETS</p>
            <p className={css.text}>{formattedFollowers} FOLLOWERS</p>
          </div>
          <button
            type="button"
            className={
              isFollowing ? `${css.buttonClicked} ${css.button}` : css.button
            }
            onClick={() => clickFollow(id, isFollowing, followers)}
          >
            {isFollowing ? 'following' : 'follow'}
          </button>
        </div>
      </div>
    </li>
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