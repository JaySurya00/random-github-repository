import { useState, useEffect } from "react";
import Github from "./assets/github-mark.png";
import "./App.css";
import Card from "./components/card";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

function App() {
  const [searchTxt, setSearchTxt] = useState("");
  const [repositories, setRepositories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  // Fetch Repositories Function
  const fetchRepositories = async () => {
    if (!searchTxt.trim()) return;

    setIsLoading(true);
    const res = await fetch(
      `https://api.github.com/search/repositories?q=language:${searchTxt}&sort=stars&order=desc&per_page=12&page=${pageNum}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    const data = await res.json();

    if (data.items) {
      setRepositories(data.items);
      setTotalPages(Math.min(100, Math.ceil(data.total_count / 10))); 
    }
    setIsLoading(false);
  };


  useEffect(() => {
    fetchRepositories();
  }, [pageNum]); 

  return (
    <>
      {/* Title */}
      <div className="title-container">
        <img className="github-logo" src={Github} alt="GitHub Logo" />
        <h1 className="title-name">GitHub Repository Finder</h1>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Programming Language"
          onChange={(e) => setSearchTxt(e.target.value)}
        />
        <button className="search-btn" onClick={() => { setPageNum(1); fetchRepositories(); }}>
          Search
        </button>
      </div>

      {/* Results */}
      <div className="repositories">
        {isLoading && <p>Loading, please wait...</p>}
        {repositories &&
          repositories.map((repo) => (
            <Card
              key={repo.id}
              repo_name={repo.full_name}
              html_url={repo.html_url}
              language={repo.language}
              forks_count={repo.forks_count}
              start_count={repo.stargazers_count}
              open_issues_count={repo.open_issues_count}
              avatar_url={repo.owner.avatar_url}
              description={repo.description}
            />
          ))}
      </div>

      {/* Pagination */}
      {repositories && (
        <div className="pagination-container">
          <button
            className="pagination-btn"
            disabled={pageNum === 1}
            onClick={() => setPageNum((currPage) => Math.max(1, currPage - 1))}
          >
            Prev
          </button>
          <p className="page-num">{pageNum}</p>
          <button
            className="pagination-btn"
            disabled={pageNum >= totalPages}
            onClick={() => setPageNum((currPage) => currPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default App;
