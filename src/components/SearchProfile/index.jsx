import { useMemo, useState } from "react";

import { Loading } from "../Loading";
import { Followers } from "../Follower";
import { Repositories } from "../Repos";
import { axiosInstance } from "../../config/axiosConfig";

import styles from "./SearchProfile.module.scss";

export const SearchProfile = () => {
  const [username, setUsername] = useState("");
  const [followerSearch, setFollowerSearch] = useState("");
  const [repoSearch, setRepoSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [followers, setFollowers] = useState([]);
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const tabs = useMemo(() => ["Followers", "Repositories"], []);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const search = async () => {
    if (!username) return;

    setLoading(true);
    setMessage("");
    try {
      const { data } = await axiosInstance.get(`/search/users?q=${username}`);

      if (data.items.length > 0) {
        const selectedProfile = data.items[0];
        setProfile(selectedProfile);
        setLoading(false);

        if (selectedProfile.followers_url) {
          getFollowers(selectedProfile.followers_url);
        }
        if (selectedProfile.repos_url) {
          getRepo(selectedProfile.repos_url);
        }
      } else {
        setMessage("No profile found");
        setLoading(false);
      }

      setUsername("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const getFollowers = async (followersUrl) => {
    try {
      const { data } = await axiosInstance.get(followersUrl);
      setFollowers(data);
      setFilteredFollowers(data);
    } catch (error) {
      console.error("Error fetching followers:", error);
      setMessage("An error occurred while fetching followers.");
    }
  };

  const getRepo = async (reposUrl) => {
    try {
      const { data } = await axiosInstance.get(reposUrl);
      setRepos(data);
      setFilteredRepos(data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setMessage("An error occurred while fetching repositories.");
    }
  };

  const handleFollowerSearch = (searchTerm) => {
    setFollowerSearch(searchTerm);

    const filtered = followers.filter((follower) =>
      follower.login.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredFollowers(filtered);
  };

  const handleRepoSearch = (searchTerm) => {
    setRepoSearch(searchTerm);

    const filtered = repos.filter((repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredRepos(filtered);
  };

  return (
    <>
      <h1>Search GitHub Profile</h1>

      <input
        type="text"
        className={styles["input-field"]}
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className={styles["search-btn"]}
        onClick={search}
        disabled={loading || !username}
      >
        {loading ? <Loading /> : "Search"}
      </button>

      {message && <div className={styles.message}>{message}</div>}

      {profile.login && (
        <div className={styles["profile-container"]}>
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
            <img
              className={styles.avatar}
              src={profile.avatar_url}
              alt={profile.login}
            />
          </a>

          <h3>{profile.login}</h3>

          <div className={styles["tab-navigation"]}>
            {tabs.map((tab, index) => (
              <button
                className={`${styles["tab-btn"]} ${
                  selectedIndex === index ? styles.active : ""
                }`}
                key={tab}
                onClick={() => setSelectedIndex(index)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div
            className={`${styles["tab-content"]}  ${
              selectedIndex === 0 ? styles.active : ""
            }`}
          >
            {selectedIndex === 0 && (
              <Followers
                filteredFollowers={filteredFollowers}
                followerSearch={followerSearch}
                handleFollowerSearch={handleFollowerSearch}
              />
            )}
          </div>

          <div
            className={`${styles["tab-content"]}  ${
              selectedIndex === 1 ? styles.active : ""
            }`}
          >
            {selectedIndex === 1 && (
              <Repositories
                filteredRepos={filteredRepos}
                repoSearch={repoSearch}
                handleRepoSearch={handleRepoSearch}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
