import Star from "../assets/star.svg"
import Fork from "../assets/git-fork.svg"
import OpenIssue from "../assets/info.svg"
import './Card.css'

const Card = ({ repo_name, html_url, language, avatar_url, forks_count, open_issues_count, start_count, description }) => {
    return (
        <a href={html_url} target="_blank">
            <div className="repository-card">
                <div className="repository-name-container">
                    <img src={avatar_url} alt="" className="repository-avatar" />
                    <h3 className="repository-name">{repo_name}</h3>
                </div>
                <div className="repository-info">
                    <p className="repository-description">{description}</p>
                    <div className="repository-stats">
                        <div className="repository-stat-container">
                            <img src={Star} alt="Star Image" className="repository-img" />
                            <p className="respository-stat">{start_count}</p>
                        </div>
                        <div className="repository-stat-container">
                            <img src={Fork} alt="Fork Image" className="repository-img" />
                            <p className="respository-stat">{forks_count}</p>
                        </div>
                        <div className="repository-stat-container">
                            <img src={OpenIssue} alt="Open Issue Image" className="repository-img" />
                            <p className="repository-stat">{open_issues_count}</p>
                        </div>
                    </div>
                </div>
            </div>
        </a>

    )
}

export default Card