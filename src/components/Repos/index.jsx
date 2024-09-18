import React from "react";
import styles from "./Repos.module.scss";

export const Repositories = ({
  filteredRepos,
  repoSearch,
  handleRepoSearch,
}) => (
  <div className={styles["tab-content active"]}>
    <h2>Repositories</h2>
    <input
      type="text"
      className={styles["input-field"]}
      placeholder="Search repositories"
      value={repoSearch}
      onChange={(e) => handleRepoSearch(e.target.value)}
    />
    <div className={styles.table}>
      {filteredRepos.length > 0 ? (
        filteredRepos.map((repository) => (
          <div className={styles["table-row"]} key={repository.id}>
            <span>{repository.name}</span>
            <p>{repository.description ? repository.description : "-"}</p>
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Repo
            </a>
          </div>
        ))
      ) : (
        <div className={styles.message}>No repositories found</div>
      )}
    </div>
  </div>
);
