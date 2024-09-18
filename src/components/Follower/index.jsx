import React from "react";
import styles from "./Followers.module.scss";

export const Followers = ({
  filteredFollowers,
  followerSearch,
  handleFollowerSearch,
}) => (
  <>
    <h2>Followers</h2>
    <input
      type="text"
      className={styles["input-field"]}
      placeholder="Search followers"
      value={followerSearch}
      onChange={(e) => handleFollowerSearch(e.target.value)}
    />
    <div className={styles.table}>
      {filteredFollowers.length > 0 ? (
        filteredFollowers.map((follower) => (
          <div className={styles["table-row"]} key={follower.id}>
            <span>{follower.login}</span>
            <img
              className={styles["follower-avatar"]}
              src={follower.avatar_url}
              alt={follower.login}
            />
            <a
              href={follower.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Profile
            </a>
          </div>
        ))
      ) : (
        <div>No followers found</div>
      )}
    </div>
  </>
);
